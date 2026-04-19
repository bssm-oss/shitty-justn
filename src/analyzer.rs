use crate::models::{PackageInfo, PackageStatus};

pub fn analyze(packages: Vec<PackageInfo>) -> (Vec<PackageStatus>, u8, f64, usize) {
    let mut categorized = Vec::new();
    let mut total_age = 0;
    let mut zombie_count = 0;
    let mut score: i32 = 100;

    for pkg in packages {
        if let Some(age) = pkg.days_since_update {
            total_age += age;
        }

        let status = if pkg.days_since_update.unwrap_or(0) >= 1000 {
            zombie_count += 1;
            score -= 15;
            PackageStatus::Zombie(pkg.clone())
        } else if pkg.current_version.as_ref() == Some(&pkg.latest_version) {
            PackageStatus::UpToDate(pkg.clone())
        } else {
            score -= 5;
            PackageStatus::Outdated(pkg.clone())
        };

        if pkg.deprecated {
            score -= 10;
        }

        categorized.push(status);
    }

    let avg_age = if categorized.is_empty() {
        0.0
    } else {
        total_age as f64 / categorized.len() as f64
    };

    (categorized, score.clamp(0, 100) as u8, avg_age, zombie_count)
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Utc;

    fn make_pkg(name: &str, current: Option<&str>, latest: &str, days: Option<i64>, deprecated: bool) -> PackageInfo {
        PackageInfo {
            name: name.to_string(),
            current_version: current.map(|s| s.to_string()),
            latest_version: latest.to_string(),
            last_published: Some(Utc::now()),
            days_since_update: days,
            deprecated,
            weekly_downloads: None,
            license: None,
        }
    }

    #[test]
    fn empty_packages_returns_defaults() {
        let (categorized, score, avg_age, zombies) = analyze(vec![]);
        assert_eq!(categorized.len(), 0);
        assert_eq!(score, 100);
        assert_eq!(avg_age, 0.0);
        assert_eq!(zombies, 0);
    }

    #[test]
    fn all_up_to_date_score_100() {
        let pkgs = vec![
            make_pkg("foo", Some("1.0.0"), "1.0.0", Some(10), false),
            make_pkg("bar", Some("2.0.0"), "2.0.0", Some(30), false),
        ];
        let (categorized, score, _avg, zombies) = analyze(pkgs);
        assert_eq!(score, 100);
        assert_eq!(zombies, 0);
        assert!(matches!(categorized[0], PackageStatus::UpToDate(_)));
        assert!(matches!(categorized[1], PackageStatus::UpToDate(_)));
    }

    #[test]
    fn outdated_deducts_5_each() {
        let pkgs = vec![
            make_pkg("a", Some("1.0.0"), "2.0.0", Some(100), false),
            make_pkg("b", Some("1.0.0"), "3.0.0", Some(200), false),
        ];
        let (_, score, _, _) = analyze(pkgs);
        assert_eq!(score, 90); // 100 - 5 - 5
    }

    #[test]
    fn zombie_deducts_15() {
        let pkgs = vec![
            make_pkg("old-lib", Some("0.1.0"), "0.2.0", Some(1500), false),
        ];
        let (_, score, _, zombies) = analyze(pkgs);
        assert_eq!(score, 85); // 100 - 15
        assert_eq!(zombies, 1);
    }

    #[test]
    fn deprecated_deducts_10_additionally() {
        // deprecated + outdated = -5 -10 = 85
        let pkgs = vec![
            make_pkg("dep-lib", Some("1.0.0"), "2.0.0", Some(50), true),
        ];
        let (_, score, _, _) = analyze(pkgs);
        assert_eq!(score, 85); // 100 - 5(outdated) - 10(deprecated)
    }

    #[test]
    fn zombie_plus_deprecated_stacks() {
        // zombie(-15) + deprecated(-10) = 75
        let pkgs = vec![
            make_pkg("dead-lib", Some("0.1.0"), "1.0.0", Some(2000), true),
        ];
        let (_, score, _, zombies) = analyze(pkgs);
        assert_eq!(score, 75); // 100 - 15 - 10
        assert_eq!(zombies, 1);
    }

    #[test]
    fn score_clamped_at_zero() {
        // 10 zombies: 100 - (15*10) = -50 → clamped to 0
        let pkgs: Vec<_> = (0..10).map(|i| {
            make_pkg(&format!("z{}", i), Some("0.1.0"), "1.0.0", Some(2000), false)
        }).collect();
        let (_, score, _, _) = analyze(pkgs);
        assert_eq!(score, 0);
    }

    #[test]
    fn average_age_calculation() {
        let pkgs = vec![
            make_pkg("a", Some("1.0.0"), "1.0.0", Some(100), false),
            make_pkg("b", Some("1.0.0"), "1.0.0", Some(200), false),
            make_pkg("c", Some("1.0.0"), "1.0.0", Some(300), false),
        ];
        let (_, _, avg_age, _) = analyze(pkgs);
        assert!((avg_age - 200.0).abs() < f64::EPSILON);
    }

    #[test]
    fn none_days_treated_as_zero_for_zombie_check() {
        // days_since_update = None → unwrap_or(0) < 1000, 그래서 zombie 아님
        let pkgs = vec![
            make_pkg("unknown-age", Some("1.0.0"), "2.0.0", None, false),
        ];
        let (categorized, score, _, zombies) = analyze(pkgs);
        assert_eq!(zombies, 0);
        assert_eq!(score, 95); // outdated -5
        assert!(matches!(categorized[0], PackageStatus::Outdated(_)));
    }

    #[test]
    fn exactly_1000_days_is_zombie() {
        let pkgs = vec![
            make_pkg("borderline", Some("1.0.0"), "2.0.0", Some(1000), false),
        ];
        let (categorized, _, _, zombies) = analyze(pkgs);
        assert_eq!(zombies, 1);
        assert!(matches!(categorized[0], PackageStatus::Zombie(_)));
    }

    #[test]
    fn up_to_date_but_deprecated() {
        let pkgs = vec![
            make_pkg("latest-deprecated", Some("3.0.0"), "3.0.0", Some(10), true),
        ];
        let (categorized, score, _, _) = analyze(pkgs);
        assert_eq!(score, 90); // up-to-date(0) - deprecated(10)
        assert!(matches!(categorized[0], PackageStatus::UpToDate(_)));
    }
}
