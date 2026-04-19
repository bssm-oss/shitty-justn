use colored::*;
use crate::models::{ScanResult, PackageStatus};
use crate::replacements::get_replacement;

pub fn format_terminal(results: &[ScanResult]) -> String {
    let mut output = String::new();

    for res in results {
        output.push_str(&format!("\n📦 dep-age scan: {}\n\n", res.project.path.display().to_string().bold()));

        let mut up_to_date = Vec::new();
        let mut outdated = Vec::new();
        let mut zombie = Vec::new();

        for pkg in &res.packages {
            match pkg {
                PackageStatus::UpToDate(_) => up_to_date.push(pkg),
                PackageStatus::Outdated(_) => outdated.push(pkg),
                PackageStatus::Zombie(_) => zombie.push(pkg),
            }
        }

        if !up_to_date.is_empty() {
            output.push_str(&format!("{}\n", format!("✅ 최신 ({})", up_to_date.len()).green()));
            for pkg in up_to_date {
                let info = pkg.info();
                output.push_str(&format!("  {:<20} {:<12} ← 최신        {}일 전 업데이트\n", 
                    info.name, info.current_version.as_deref().unwrap_or("?"), info.days_since_update.unwrap_or(0)));
            }
            output.push('\n');
        }

        if !outdated.is_empty() {
            output.push_str(&format!("{}\n", format!("⚠️ 업데이트 필요 ({})", outdated.len()).yellow()));
            for pkg in outdated {
                let info = pkg.info();
                output.push_str(&format!("  {:<20} {:<12} → {:<12} {}일 전 버전\n", 
                    info.name, info.current_version.as_deref().unwrap_or("?"), info.latest_version, info.days_since_update.unwrap_or(0)));
            }
            output.push('\n');
        }

        if !zombie.is_empty() {
            output.push_str(&format!("{}\n", format!("💀 좀비 ({})", zombie.len()).red()));
            for pkg in zombie {
                let info = pkg.info();
                output.push_str(&format!("  {:<20} {:<12} {:>24}일 전 마지막 업데이트\n", 
                    info.name, info.current_version.as_deref().unwrap_or("?"), info.days_since_update.unwrap_or(0)));
            }
            output.push('\n');
        }

        output.push_str(&"─".repeat(40));
        output.push('\n');
        output.push_str(&format!("건강도: {}/100\n", res.health_score));
        output.push_str(&format!("평균 나이: {:.1}일\n", res.average_age_days));
        output.push_str(&format!("좀비 패키지: {}개\n", res.zombie_count));

        for pkg in &res.packages {
            let info = pkg.info();
            if let Some(replacement) = get_replacement(&info.name) {
                if matches!(pkg, PackageStatus::Zombie(_)) || info.deprecated {
                    output.push_str(&format!("권장: {} → {} 마이그레이션 고려\n", info.name, replacement).cyan().to_string());
                }
            }
        }
    }

    output
}
