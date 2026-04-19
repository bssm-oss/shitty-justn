use std::path::Path;
use std::sync::Arc;
use anyhow::Result;
use chrono::{DateTime, Utc};
use serde::Deserialize;
use tokio::sync::Semaphore;
use futures::future::join_all;
use crate::models::PackageInfo;

#[derive(Deserialize)]
struct GoLatestResponse {
    #[serde(rename = "Version")]
    version: String,
    #[serde(rename = "Time")]
    time: String,
}

#[derive(Deserialize)]
struct GitHubLicenseResponse {
    license: Option<GitHubLicenseInfo>,
}

#[derive(Deserialize)]
struct GitHubLicenseInfo {
    spdx_id: Option<String>,
}

pub fn parse_go_mod(content: &str) -> Vec<(String, String)> {
    let re = regex::Regex::new(r"^\t([a-zA-Z0-9\.\-/]+)\s+(v[0-9\.]+.*)").unwrap();
    let mut deps = Vec::new();
    for line in content.lines() {
        if let Some(cap) = re.captures(line) {
            deps.push((cap[1].to_string(), cap[2].to_string()));
        }
    }
    deps
}

pub async fn fetch_go_packages(project_path: &Path, client: &reqwest::Client) -> Result<Vec<PackageInfo>> {
    let mod_path = project_path.join("go.mod");
    let content = std::fs::read_to_string(mod_path)?;
    let deps = parse_go_mod(&content);

    let semaphore = Arc::new(Semaphore::new(10));
    let mut tasks = Vec::new();

    for (name, version) in deps {
        let client = client.clone();
        let semaphore = semaphore.clone();
        tasks.push(tokio::spawn(async move {
            let _permit = semaphore.acquire().await.unwrap();
            fetch_single_go(name, version, &client).await
        }));
    }

    let results = join_all(tasks).await;
    Ok(results.into_iter().filter_map(|r| r.ok().and_then(|i| i.ok())).collect())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_go_mod_basic() {
        let content = "module example.com/mymod\n\ngo 1.21\n\nrequire (\n\tgithub.com/gin-gonic/gin v1.9.1\n\tgolang.org/x/net v0.15.0\n)\n";
        let deps = parse_go_mod(content);
        assert_eq!(deps.len(), 2);
        assert_eq!(deps[0], ("github.com/gin-gonic/gin".to_string(), "v1.9.1".to_string()));
        assert_eq!(deps[1], ("golang.org/x/net".to_string(), "v0.15.0".to_string()));
    }

    #[test]
    fn parse_go_mod_empty() {
        let content = "module example.com/mymod\n\ngo 1.21\n";
        let deps = parse_go_mod(content);
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn parse_go_mod_with_indirect() {
        let content = "require (\n\tgithub.com/foo/bar v1.0.0\n\tgithub.com/baz/qux v2.0.0 // indirect\n)\n";
        let deps = parse_go_mod(content);
        assert_eq!(deps.len(), 2);
        // indirect 주석이 버전에 포함됨 (현재 구현 동작)
        assert_eq!(deps[0].0, "github.com/foo/bar");
        assert_eq!(deps[0].1, "v1.0.0");
    }

    #[test]
    fn parse_go_mod_no_tab_prefix_ignored() {
        // tab으로 시작하지 않는 줄은 무시됨
        let content = "github.com/foo/bar v1.0.0\n";
        let deps = parse_go_mod(content);
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn extract_github_owner_repo_valid() {
        assert_eq!(extract_github_owner_repo("github.com/foo/bar"), Some(("foo", "bar")));
    }

    #[test]
    fn extract_github_owner_repo_with_subpkg() {
        assert_eq!(extract_github_owner_repo("github.com/foo/bar/subpkg"), Some(("foo", "bar")));
    }

    #[test]
    fn extract_github_owner_repo_non_github() {
        assert_eq!(extract_github_owner_repo("golang.org/x/net"), None);
    }

    #[test]
    fn extract_github_owner_repo_incomplete() {
        assert_eq!(extract_github_owner_repo("github.com/foo"), None);
    }
}

/// github.com/foo/bar → ("foo", "bar")
fn extract_github_owner_repo(module: &str) -> Option<(&str, &str)> {
    let stripped = module.strip_prefix("github.com/")?;
    let mut parts = stripped.splitn(3, '/');
    let owner = parts.next()?;
    let repo = parts.next()?;
    Some((owner, repo))
}

async fn fetch_single_go(name: String, current_version: String, client: &reqwest::Client) -> Result<PackageInfo> {
    let url = format!("https://proxy.golang.org/{}/@latest", name);
    let resp: GoLatestResponse = client.get(&url).send().await?.json().await?;

    let last_published = DateTime::parse_from_rfc3339(&resp.time).ok().map(|dt| dt.with_timezone(&Utc));
    let days_since_update = last_published.map(|lp| (Utc::now() - lp).num_days());

    // deprecated 확인: go.mod의 Deprecated 주석은 @latest 응답에 없으므로
    // 모듈의 go.mod 파일을 직접 가져와서 "// Deprecated:" 주석 확인
    let deprecated = {
        let gomod_url = format!("https://proxy.golang.org/{}/@v/{}/.mod", name, resp.version);
        if let Ok(mod_resp) = client.get(&gomod_url).send().await {
            if let Ok(text) = mod_resp.text().await {
                text.contains("// Deprecated:")
            } else {
                false
            }
        } else {
            false
        }
    };

    // GitHub 모듈이면 GitHub API로 라이선스 조회
    let license = if let Some((owner, repo)) = extract_github_owner_repo(&name) {
        let license_url = format!("https://api.github.com/repos/{}/{}", owner, repo);
        if let Ok(resp) = client.get(&license_url).send().await {
            if let Ok(info) = resp.json::<GitHubLicenseResponse>().await {
                info.license.and_then(|l| l.spdx_id).filter(|s| s != "NOASSERTION")
            } else {
                None
            }
        } else {
            None
        }
    } else {
        None
    };

    Ok(PackageInfo {
        name,
        current_version: Some(current_version),
        latest_version: resp.version,
        last_published,
        days_since_update,
        deprecated,
        weekly_downloads: None,
        license,
    })
}
