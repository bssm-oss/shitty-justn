use chrono::{DateTime, Utc};
use serde::Serialize;
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, PartialEq)]
pub enum ProjectType { Node, Python, Java, Go }

#[derive(Debug, Clone, Serialize)]
pub struct Project {
    pub path: PathBuf,
    pub project_type: ProjectType,
}

#[derive(Debug, Clone, Serialize)]
pub struct PackageInfo {
    pub name: String,
    pub current_version: Option<String>,
    pub latest_version: String,
    pub last_published: Option<DateTime<Utc>>,
    pub days_since_update: Option<i64>,
    pub deprecated: bool,
    pub weekly_downloads: Option<u64>,
    pub license: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "status", content = "info")]
pub enum PackageStatus {
    UpToDate(PackageInfo),
    Outdated(PackageInfo),
    Zombie(PackageInfo),
}

impl PackageStatus {
    pub fn info(&self) -> &PackageInfo {
        match self {
            Self::UpToDate(i) | Self::Outdated(i) | Self::Zombie(i) => i,
        }
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct ScanResult {
    pub project: Project,
    pub packages: Vec<PackageStatus>,
    pub health_score: u8,
    pub average_age_days: f64,
    pub zombie_count: usize,
}
