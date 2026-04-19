use crate::models::{ScanResult, PackageStatus, ProjectType};

pub fn format_markdown(results: &[ScanResult]) -> String {
    let mut output = String::from("# dep-age Report

");

    for res in results {
        let project_type = match res.project.project_type {
            ProjectType::Node => "Node",
            ProjectType::Python => "Python",
            ProjectType::Java => "Java",
            ProjectType::Go => "Go",
        };

        output.push_str(&format!("## {} ({})

", res.project.path.display(), project_type));
        output.push_str("| Package | Current | Latest | Age (days) | Status |
");
        output.push_str("|---------|---------|--------|------------|--------|
");

        for pkg in &res.packages {
            let info = pkg.info();
            let status_emoji = match pkg {
                PackageStatus::UpToDate(_) => "✅",
                PackageStatus::Outdated(_) => "⚠️",
                PackageStatus::Zombie(_) => "💀",
            };

            output.push_str(&format!("| {} | {} | {} | {} | {} |
", 
                info.name, 
                info.current_version.as_deref().unwrap_or("?"), 
                info.latest_version, 
                info.days_since_update.unwrap_or(0),
                status_emoji
            ));
        }

        output.push_str(&format!("
**Health Score: {}/100** | Average Age: {:.1} days | Zombies: {}

", 
            res.health_score, res.average_age_days, res.zombie_count));
    }

    output
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::*;
    use std::path::PathBuf;
    use chrono::Utc;

    fn make_pkg_status(name: &str, current: &str, latest: &str, days: i64, status_type: &str) -> PackageStatus {
        let info = PackageInfo {
            name: name.to_string(),
            current_version: Some(current.to_string()),
            latest_version: latest.to_string(),
            last_published: Some(Utc::now()),
            days_since_update: Some(days),
            deprecated: false,
            weekly_downloads: None,
            license: None,
        };
        match status_type {
            "up" => PackageStatus::UpToDate(info),
            "out" => PackageStatus::Outdated(info),
            "zombie" => PackageStatus::Zombie(info),
            _ => unreachable!(),
        }
    }

    #[test]
    fn markdown_contains_header() {
        let output = format_markdown(&[]);
        assert!(output.contains("# dep-age Report"));
    }

    #[test]
    fn markdown_contains_table_and_data() {
        let results = vec![ScanResult {
            project: Project { path: PathBuf::from("/myapp"), project_type: ProjectType::Python },
            packages: vec![
                make_pkg_status("requests", "2.28.0", "2.31.0", 90, "out"),
                make_pkg_status("flask", "2.3.0", "2.3.0", 10, "up"),
            ],
            health_score: 95,
            average_age_days: 50.0,
            zombie_count: 0,
        }];
        let output = format_markdown(&results);
        assert!(output.contains("| Package |"));
        assert!(output.contains("requests"));
        assert!(output.contains("flask"));
        assert!(output.contains("95/100"));
        assert!(output.contains("Python"));
        assert!(output.contains("⚠️")); // outdated
        assert!(output.contains("✅")); // up to date
    }

    #[test]
    fn markdown_zombie_emoji() {
        let results = vec![ScanResult {
            project: Project { path: PathBuf::from("/old"), project_type: ProjectType::Node },
            packages: vec![make_pkg_status("dead-lib", "0.1.0", "2.0.0", 1500, "zombie")],
            health_score: 85,
            average_age_days: 1500.0,
            zombie_count: 1,
        }];
        let output = format_markdown(&results);
        assert!(output.contains("💀"));
        assert!(output.contains("Zombies: 1"));
    }
}
