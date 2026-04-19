use std::path::Path;
use std::sync::Arc;
use anyhow::Result;
use chrono::Utc;
use serde::Deserialize;
use tokio::sync::Semaphore;
use futures::future::join_all;
use crate::models::PackageInfo;

#[derive(Deserialize)]
struct MavenSearchResponse {
    response: MavenResponseData,
}

#[derive(Deserialize)]
struct MavenResponseData {
    docs: Vec<MavenDoc>,
}

#[derive(Deserialize)]
struct MavenDoc {
    #[serde(alias = "v", alias = "latestVersion")]
    v: String,
    timestamp: i64,
}

pub fn parse_pom_dependencies(content: &str) -> Vec<(String, String, String)> {
    let re = regex::Regex::new(r"(?s)<dependency>\s*<groupId>(.*?)</groupId>\s*<artifactId>(.*?)</artifactId>\s*<version>(.*?)</version>").unwrap();
    let mut deps = Vec::new();
    for cap in re.captures_iter(content) {
        deps.push((cap[1].to_string(), cap[2].to_string(), cap[3].to_string()));
    }
    deps
}

pub async fn fetch_maven_packages(project_path: &Path, client: &reqwest::Client) -> Result<Vec<PackageInfo>> {
    let pom_path = project_path.join("pom.xml");
    let content = std::fs::read_to_string(pom_path)?;
    let deps = parse_pom_dependencies(&content);

    let semaphore = Arc::new(Semaphore::new(10));
    let mut tasks = Vec::new();

    for (group, artifact, version) in deps {
        let client = client.clone();
        let semaphore = semaphore.clone();
        tasks.push(tokio::spawn(async move {
            let _permit = semaphore.acquire().await.unwrap();
            fetch_single_maven(group, artifact, version, &client).await
        }));
    }

    let results = join_all(tasks).await;
    Ok(results.into_iter().filter_map(|r| r.ok().and_then(|i| i.ok())).collect())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_pom_single_dependency() {
        let content = r#"<project>
            <dependencies>
                <dependency>
                    <groupId>org.springframework</groupId>
                    <artifactId>spring-core</artifactId>
                    <version>5.3.20</version>
                </dependency>
            </dependencies>
        </project>"#;
        let deps = parse_pom_dependencies(content);
        assert_eq!(deps.len(), 1);
        assert_eq!(deps[0], ("org.springframework".to_string(), "spring-core".to_string(), "5.3.20".to_string()));
    }

    #[test]
    fn parse_pom_multiple_dependencies() {
        let content = r#"<dependencies>
            <dependency>
                <groupId>com.google.guava</groupId>
                <artifactId>guava</artifactId>
                <version>31.1-jre</version>
            </dependency>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.13.2</version>
            </dependency>
        </dependencies>"#;
        let deps = parse_pom_dependencies(content);
        assert_eq!(deps.len(), 2);
    }

    #[test]
    fn parse_pom_no_dependencies() {
        let content = "<project></project>";
        let deps = parse_pom_dependencies(content);
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn parse_pom_without_version_skipped() {
        // version 태그가 없으면 regex가 매칭하지 않음
        let content = r#"<dependency>
            <groupId>foo</groupId>
            <artifactId>bar</artifactId>
        </dependency>"#;
        let deps = parse_pom_dependencies(content);
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn parse_license_from_pom_found() {
        let pom = r#"<project>
            <licenses>
                <license>
                    <name>Apache License 2.0</name>
                </license>
            </licenses>
        </project>"#;
        assert_eq!(parse_license_from_pom(pom), Some("Apache License 2.0".to_string()));
    }

    #[test]
    fn parse_license_from_pom_not_found() {
        assert_eq!(parse_license_from_pom("<project></project>"), None);
    }

    #[test]
    fn is_pom_relocated_true() {
        let pom = r#"<distributionManagement><relocation><groupId>new.group</groupId></relocation></distributionManagement>"#;
        assert!(is_pom_relocated(pom));
    }

    #[test]
    fn is_pom_relocated_false() {
        assert!(!is_pom_relocated("<project></project>"));
    }
}

fn parse_license_from_pom(pom_xml: &str) -> Option<String> {
    let re = regex::Regex::new(r"(?s)<licenses>\s*<license>\s*<name>(.*?)</name>").ok()?;
    re.captures(pom_xml).map(|c| c[1].trim().to_string())
}

fn is_pom_relocated(pom_xml: &str) -> bool {
    pom_xml.contains("<relocation>")
}

async fn fetch_single_maven(group: String, artifact: String, current_version: String, client: &reqwest::Client) -> Result<PackageInfo> {
    let url = format!("https://search.maven.org/solrsearch/select?q=g:%22{}%22+AND+a:%22{}%22&rows=1&wt=json", group, artifact);
    let resp: MavenSearchResponse = client.get(&url).send().await?.json().await?;

    if let Some(doc) = resp.response.docs.first() {
        let latest_version = doc.v.clone();
        let last_published = chrono::TimeZone::timestamp_opt(&Utc, doc.timestamp / 1000, 0).single();
        let days_since_update = last_published.map(|lp| (Utc::now() - lp).num_days());

        // POM 파일에서 라이선스 조회
        let group_path = group.replace('.', "/");
        let pom_url = format!(
            "https://repo1.maven.org/maven2/{}/{}/{}/{}-{}.pom",
            group_path, artifact, latest_version, artifact, latest_version
        );
        // POM에서 라이선스 + relocation(deprecated) 확인
        let (license, deprecated) = if let Ok(resp) = client.get(&pom_url).send().await {
            if let Ok(pom_text) = resp.text().await {
                (parse_license_from_pom(&pom_text), is_pom_relocated(&pom_text))
            } else {
                (None, false)
            }
        } else {
            (None, false)
        };

        // 현재 버전의 POM도 확인 (현재 쓰는 버전이 relocated일 수 있음)
        let deprecated = if !deprecated {
            let current_pom_url = format!(
                "https://repo1.maven.org/maven2/{}/{}/{}/{}-{}.pom",
                group_path, artifact, current_version, artifact, current_version
            );
            if let Ok(resp) = client.get(&current_pom_url).send().await {
                if let Ok(pom_text) = resp.text().await {
                    is_pom_relocated(&pom_text)
                } else {
                    false
                }
            } else {
                false
            }
        } else {
            deprecated
        };

        Ok(PackageInfo {
            name: format!("{}:{}", group, artifact),
            current_version: Some(current_version),
            latest_version,
            last_published,
            days_since_update,
            deprecated,
            weekly_downloads: None,
            license,
        })
    } else {
        anyhow::bail!("Not found")
    }
}
