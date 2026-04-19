use crate::models::ScanResult;
use serde::Serialize;

#[derive(Serialize)]
struct JsonOutput<'a> {
    projects: &'a [ScanResult],
}

pub fn format_json(results: &[ScanResult]) -> String {
    let output = JsonOutput { projects: results };
    serde_json::to_string_pretty(&output).unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::*;
    use std::path::PathBuf;

    fn make_scan_result(score: u8, avg_age: f64, zombies: usize) -> ScanResult {
        ScanResult {
            project: Project { path: PathBuf::from("/test"), project_type: ProjectType::Node },
            packages: vec![],
            health_score: score,
            average_age_days: avg_age,
            zombie_count: zombies,
        }
    }

    #[test]
    fn format_json_valid_output() {
        let results = vec![make_scan_result(85, 120.5, 2)];
        let output = format_json(&results);
        let parsed: serde_json::Value = serde_json::from_str(&output).unwrap();
        assert_eq!(parsed["projects"][0]["health_score"], 85);
        assert_eq!(parsed["projects"][0]["zombie_count"], 2);
    }

    #[test]
    fn format_json_empty_results() {
        let output = format_json(&[]);
        let parsed: serde_json::Value = serde_json::from_str(&output).unwrap();
        assert!(parsed["projects"].as_array().unwrap().is_empty());
    }
}
