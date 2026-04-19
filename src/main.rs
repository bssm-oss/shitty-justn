mod models;
mod scanner;
mod analyzer;
mod replacements;
mod registry;
mod formatter;

use std::path::PathBuf;
use clap::Parser;
use anyhow::Result;
use models::{ScanResult, ProjectType};
use registry::npm::fetch_npm_packages;
use registry::pypi::fetch_pypi_packages;
use analyzer::analyze;
use formatter::terminal::format_terminal;
use formatter::json::format_json;
use formatter::markdown::format_markdown;

#[derive(Parser)]
#[command(name = "dep-age", version, about = "Visualize how old your project dependencies are")]
struct Cli {
    #[arg(long, default_value = ".")]
    dir: PathBuf,

    #[arg(long, default_value = "terminal")]
    format: OutputFormat,

    #[arg(long)]
    ci: Option<u8>,

    #[arg(long, default_value_t = 4)]
    max_depth: u8,
}

#[derive(Clone, clap::ValueEnum)]
enum OutputFormat {
    Terminal,
    Json,
    Markdown,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();
    let client = reqwest::Client::builder()
        .user_agent("dep-age/0.1.0")
        .build()?;

    let projects = scanner::find_projects(&cli.dir, cli.max_depth);
    let mut scan_results = Vec::new();

    for project in projects {
        let packages = match project.project_type {
            ProjectType::Node => fetch_npm_packages(&project.path, &client).await?,
            ProjectType::Python => fetch_pypi_packages(&project.path, &client).await?,
            ProjectType::Java => registry::maven::fetch_maven_packages(&project.path, &client).await?,
            ProjectType::Go => registry::go_mod::fetch_go_packages(&project.path, &client).await?,
        };

        let (categorized, health_score, avg_age, zombie_count) = analyze(packages);
        
        scan_results.push(ScanResult {
            project,
            packages: categorized,
            health_score,
            average_age_days: avg_age,
            zombie_count,
        });
    }

    let output = match cli.format {
        OutputFormat::Terminal => format_terminal(&scan_results),
        OutputFormat::Json => format_json(&scan_results),
        OutputFormat::Markdown => format_markdown(&scan_results),
    };

    println!("{}", output);

    if let Some(threshold) = cli.ci {
        let min_score = scan_results.iter().map(|r| r.health_score).min().unwrap_or(100);
        if min_score < threshold {
            eprintln!("CI check failed: Health score {} is below threshold {}", min_score, threshold);
            std::process::exit(1);
        }
    }

    Ok(())
}
