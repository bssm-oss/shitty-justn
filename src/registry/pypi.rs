use std::collections::HashMap;
use std::path::Path;
use std::sync::Arc;
use anyhow::Result;
use chrono::{DateTime, Utc};
use serde::Deserialize;
use tokio::sync::Semaphore;
use futures::future::join_all;
use regex::Regex;
use crate::models::PackageInfo;

#[derive(Deserialize)]
struct PyPIInfo {
    version: String,
    license: Option<String>,
    classifiers: Option<Vec<String>>,
}

#[derive(Deserialize)]
struct PyPIRelease {
    upload_time_iso_8601: String,
}

#[derive(Deserialize)]
struct PyPIResponse {
    info: PyPIInfo,
    releases: HashMap<String, Vec<PyPIRelease>>,
}

pub fn parse_requirements(content: &str) -> Vec<(String, Option<String>)> {
    let re = Regex::new(r"^([a-zA-Z0-9_\-\.]+)(?:[=<>!~ ]+([a-zA-Z0-9_\-\.\*]+))?").unwrap();
    let mut packages = Vec::new();

    for line in content.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }

        if let Some(caps) = re.captures(line) {
            let name = caps.get(1).map(|m| m.as_str().to_string()).unwrap();
            let version = caps.get(2).map(|m| m.as_str().to_string());
            packages.push((name, version));
        }
    }

    packages
}

pub async fn fetch_pypi_packages(project_path: &Path, client: &reqwest::Client) -> Result<Vec<PackageInfo>> {
    let req_path = project_path.join("requirements.txt");
    let content = std::fs::read_to_string(req_path)?;
    let packages_to_fetch = parse_requirements(&content);

    let semaphore = Arc::new(Semaphore::new(10));
    let mut tasks = Vec::new();

    for (name, current_version) in packages_to_fetch {
        let client = client.clone();
        let semaphore = semaphore.clone();

        tasks.push(tokio::spawn(async move {
            let _permit = semaphore.acquire().await.unwrap();
            fetch_single_pypi_package(name, current_version, &client).await
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_simple_requirements() {
        let content = "requests==2.28.0\nflask>=2.0\nnumpy\n";
        let deps = parse_requirements(content);
        assert_eq!(deps.len(), 3);
        assert_eq!(deps[0], ("requests".to_string(), Some("2.28.0".to_string())));
        assert_eq!(deps[1], ("flask".to_string(), Some("2.0".to_string())));
        assert_eq!(deps[2], ("numpy".to_string(), None));
    }

    #[test]
    fn parse_requirements_ignores_comments_and_blanks() {
        let content = "# this is a comment\n\nrequests==2.28.0\n  # another comment\n  \n";
        let deps = parse_requirements(content);
        assert_eq!(deps.len(), 1);
        assert_eq!(deps[0].0, "requests");
    }

    #[test]
    fn parse_requirements_various_operators() {
        let content = "a==1.0\nb>=2.0\nc~=3.0\nd!=4.0\ne<=5.0\nf>6.0\ng<7.0\n";
        let deps = parse_requirements(content);
        assert_eq!(deps.len(), 7);
        // 모든 패키지 이름이 파싱됨
        let names: Vec<_> = deps.iter().map(|(n, _)| n.as_str()).collect();
        assert_eq!(names, vec!["a", "b", "c", "d", "e", "f", "g"]);
    }

    #[test]
    fn parse_requirements_empty() {
        let deps = parse_requirements("");
        assert_eq!(deps.len(), 0);
    }

    #[test]
    fn parse_requirements_with_dots_and_hyphens() {
        let content = "my-package==1.0\nmy.other.pkg>=2.0\n";
        let deps = parse_requirements(content);
        assert_eq!(deps.len(), 2);
        assert_eq!(deps[0].0, "my-package");
        assert_eq!(deps[1].0, "my.other.pkg");
    }
}

async fn fetch_single_pypi_package(name: String, current_version: Option<String>, client: &reqwest::Client) -> Result<PackageInfo> {
    let url = format!("https://pypi.org/pypi/{}/json", name);
    let resp: PyPIResponse = client.get(&url).send().await?.json().await?;

    let latest_version = resp.info.version.clone();
    let last_published = resp.releases.get(&latest_version)
        .and_then(|r| r.first())
        .and_then(|r| DateTime::parse_from_rfc3339(&r.upload_time_iso_8601).ok())
        .map(|dt| dt.with_timezone(&Utc));

    let days_since_update = last_published.map(|lp| (Utc::now() - lp).num_days());

    let deprecated = resp.info.classifiers.as_ref()
        .map(|c| c.contains(&"Development Status :: 7 - Inactive".to_string()))
        .unwrap_or(false);

    Ok(PackageInfo {
        name,
        current_version,
        latest_version,
        last_published,
        days_since_update,
        deprecated,
        weekly_downloads: None,
        license: resp.info.license,
    })
}
