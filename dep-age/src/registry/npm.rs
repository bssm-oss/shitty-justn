use std::collections::HashMap;
use std::path::Path;
use std::sync::Arc;
use anyhow::Result;
use chrono::{DateTime, Utc};
use serde::Deserialize;
use tokio::sync::Semaphore;
use futures::future::join_all;
use crate::models::PackageInfo;

#[derive(Deserialize)]
struct PackageJson {
    dependencies: Option<HashMap<String, String>>,
    #[serde(rename = "devDependencies")]
    dev_dependencies: Option<HashMap<String, String>>,
}

#[derive(Deserialize)]
struct NpmRegistryResponse {
    #[serde(rename = "dist-tags")]
    dist_tags: Option<HashMap<String, String>>,
    time: Option<HashMap<String, String>>,
    license: Option<serde_json::Value>,
    deprecated: Option<String>,
}

#[derive(Deserialize)]
struct NpmDownloadsResponse {
    downloads: Option<u64>,
}

pub fn parse_package_json(content: &str) -> Result<HashMap<String, String>> {
    let pkg_json: PackageJson = serde_json::from_str(content)?;
    let mut all_deps = HashMap::new();
    if let Some(deps) = pkg_json.dependencies {
        all_deps.extend(deps);
    }
    if let Some(dev_deps) = pkg_json.dev_dependencies {
        all_deps.extend(dev_deps);
    }
    Ok(all_deps)
}

pub async fn fetch_npm_packages(project_path: &Path, client: &reqwest::Client) -> Result<Vec<PackageInfo>> {
    let pkg_json_path = project_path.join("package.json");
    let content = std::fs::read_to_string(pkg_json_path)?;
    let all_deps = parse_package_json(&content)?;

    let semaphore = Arc::new(Semaphore::new(10));
    let mut tasks = Vec::new();

    for (name, version) in all_deps {
        let name = name.clone();
        let current_version = clean_version(&version);
        let client = client.clone();
        let semaphore = semaphore.clone();

        tasks.push(tokio::spawn(async move {
            let _permit = semaphore.acquire().await.unwrap();
            fetch_single_package(name, current_version, &client).await
        }));
    }

    let results = join_all(tasks).await;
    let mut packages = Vec::new();
    for res in results {
        if let Ok(Ok(info)) = res {
            packages.push(info);
        }
    }

    Ok(packages)
}

fn clean_version(v: &str) -> String {
    v.trim_start_matches(['^', '~', '>', '<', '=']).to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn clean_version_strips_prefixes() {
        assert_eq!(clean_version("^1.2.3"), "1.2.3");
        assert_eq!(clean_version("~4.5.6"), "4.5.6");
        assert_eq!(clean_version(">=2.0.0"), "2.0.0");
        assert_eq!(clean_version("<=3.0.0"), "3.0.0");
        assert_eq!(clean_version(">1.0.0"), "1.0.0");
        assert_eq!(clean_version("<5.0.0"), "5.0.0");
        assert_eq!(clean_version("1.0.0"), "1.0.0"); // no prefix
    }

    #[test]
    fn parse_package_json_deps_and_dev_deps() {
        let content = r#"{
            "dependencies": {
                "react": "^18.2.0",
                "lodash": "~4.17.21"
            },
            "devDependencies": {
                "typescript": "^5.0.0"
            }
        }"#;
        let deps = parse_package_json(content).unwrap();
        assert_eq!(deps.len(), 3);
        assert_eq!(deps.get("react").unwrap(), "^18.2.0");
        assert_eq!(deps.get("lodash").unwrap(), "~4.17.21");
        assert_eq!(deps.get("typescript").unwrap(), "^5.0.0");
    }

    #[test]
    fn parse_package_json_deps_only() {
        let content = r#"{"dependencies": {"express": "4.18.0"}}"#;
        let deps = parse_package_json(content).unwrap();
        assert_eq!(deps.len(), 1);
        assert_eq!(deps.get("express").unwrap(), "4.18.0");
    }

    #[test]
    fn parse_package_json_empty_deps() {
        let content = r#"{}"#;
        let deps = parse_package_json(content).unwrap();
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn parse_package_json_null_deps() {
        let content = r#"{"dependencies": null}"#;
        let deps = parse_package_json(content).unwrap();
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn parse_package_json_malformed() {
        let result = parse_package_json("not json at all");
        assert!(result.is_err());
    }

    #[test]
    fn dev_deps_override_same_name() {
        // devDependencies가 dependencies의 같은 이름을 덮어씀
        let content = r#"{
            "dependencies": {"foo": "1.0.0"},
            "devDependencies": {"foo": "2.0.0"}
        }"#;
        let deps = parse_package_json(content).unwrap();
        assert_eq!(deps.len(), 1);
        assert_eq!(deps.get("foo").unwrap(), "2.0.0");
    }
}

async fn fetch_single_package(name: String, current_version: String, client: &reqwest::Client) -> Result<PackageInfo> {
    let registry_url = format!("https://registry.npmjs.org/{}", name);
    let download_url = format!("https://api.npmjs.org/downloads/point/last-week/{}", name);

    let registry_resp: NpmRegistryResponse = client.get(&registry_url).send().await?.json().await?;
    let download_resp: Option<NpmDownloadsResponse> = client.get(&download_url).send().await?.json().await.ok();

    let latest_version = registry_resp.dist_tags.as_ref()
        .and_then(|t| t.get("latest"))
        .cloned()
        .unwrap_or_else(|| "0.0.0".to_string());

    let last_published = registry_resp.time.as_ref()
        .and_then(|t| t.get(&latest_version))
        .and_then(|s| DateTime::parse_from_rfc3339(s).ok())
        .map(|dt| dt.with_timezone(&Utc));

    let days_since_update = last_published.map(|lp| (Utc::now() - lp).num_days());

    let license = match registry_resp.license {
        Some(serde_json::Value::String(s)) => Some(s),
        Some(serde_json::Value::Object(o)) => o.get("type").and_then(|v| v.as_str()).map(|s| s.to_string()),
        _ => None,
    };

    Ok(PackageInfo {
        name,
        current_version: Some(current_version),
        latest_version,
        last_published,
        days_since_update,
        deprecated: registry_resp.deprecated.is_some(),
        weekly_downloads: download_resp.and_then(|d| d.downloads),
        license,
    })
}
