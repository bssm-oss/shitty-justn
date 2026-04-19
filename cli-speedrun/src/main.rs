#![allow(dead_code)]

mod event;

use std::time::Duration;

use cli_speedrun::app::App;
use cli_speedrun::config;
use cli_speedrun::data::commands::load_all_datasets;
use cli_speedrun::ui;

fn main() -> anyhow::Result<()> {
    // Set up panic hook to restore terminal
    let original_hook = std::panic::take_hook();
    std::panic::set_hook(Box::new(move |panic_info| {
        ratatui::restore();
        original_hook(panic_info);
    }));

    // Load datasets
    let datasets = load_all_datasets();

    // Initialize terminal
    let mut terminal = ratatui::init();

    // Create app
    let mut app = App::new(datasets);

    // Main event loop
    loop {
        terminal.draw(|frame| ui::render(&app, frame))?;

        if let Some(ev) = event::poll_event(Duration::from_millis(config::POLL_TIMEOUT_MS))? {
            app.handle_event(ev)?;
        }

        app.tick();

        if app.should_quit() {
            break;
        }
    }

    // Restore terminal
    ratatui::restore();

    Ok(())
}
