use ratatui::layout::{Alignment, Constraint, Direction, Layout};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph};
use ratatui::Frame;

use crate::app::App;

const LOGO: &str = r#"
   _____ _      _____    _____ ____  ______ ______ _____  _____  _    _ _   _
  / ____| |    |_   _|  / ____|  _ \| ____||  ____|  __ \|  __ \| |  | | \ | |
 | |    | |      | |   | (___ | |_) | |__  | |__  | |  | | |__) | |  | |  \| |
 | |    | |      | |    \___ \|  __/|  __| |  __| | |  | |  _  /| |  | | . ` |
 | |____| |____ _| |_   ____) | |   | |____| |____| |__| | | \ \| |__| | |\  |
  \_____|______|_____| |_____/|_|   |______|______|_____/|_|  \_\\____/|_| \_|
"#;

pub fn render(app: &App, frame: &mut Frame) {
    let area = frame.area();

    // Center everything vertically
    let logo_height: u16 = 8;
    let menu_height: u16 = 7;
    let help_height: u16 = 3;
    let content_height = logo_height + menu_height + help_height;
    let top_pad = area.height.saturating_sub(content_height) / 3; // bias toward upper third

    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(top_pad),
            Constraint::Length(logo_height),
            Constraint::Length(menu_height),
            Constraint::Min(0),
            Constraint::Length(help_height),
        ])
        .split(area);

    // Logo
    let logo_lines: Vec<Line> = LOGO
        .lines()
        .map(|l| {
            Line::from(Span::styled(
                l.to_string(),
                Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD),
            ))
        })
        .collect();

    let logo = Paragraph::new(logo_lines).alignment(Alignment::Center);
    frame.render_widget(logo, chunks[1]);

    // Menu items — centered horizontally
    let side_margin = if area.width > 60 {
        (area.width - 40) / 2
    } else {
        4
    };

    let menu_area = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Length(side_margin),
            Constraint::Min(20),
            Constraint::Length(side_margin),
        ])
        .split(chunks[2]);

    let modes = ["Speedrun", "Survival", "Learning"];
    let descriptions = [
        "Type commands fast!",
        "One mistake = game over",
        "Practice with hints",
    ];
    let icons = ["🏃", "🎯", "📚"];

    let items: Vec<ListItem> = modes
        .iter()
        .zip(descriptions.iter())
        .zip(icons.iter())
        .enumerate()
        .map(|(i, ((mode, desc), icon))| {
            let is_selected = i == app.menu_index;
            let prefix = if is_selected { "  ▸ " } else { "    " };
            let style = if is_selected {
                Style::default()
                    .fg(Color::Yellow)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(Color::White)
            };

            let line = Line::from(vec![
                Span::raw(prefix),
                Span::raw(format!("{} ", icon)),
                Span::styled(format!("{:<12}", mode), style),
                Span::styled(
                    desc.to_string(),
                    Style::default().fg(Color::DarkGray),
                ),
            ]);
            ListItem::new(vec![line, Line::from("")]) // extra line for spacing
        })
        .collect();

    let menu = List::new(items);
    frame.render_widget(menu, menu_area[1]);

    // Help bar at bottom
    let help = Paragraph::new(Line::from(vec![
        Span::styled(" ↑↓", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" select  ", Style::default().fg(Color::DarkGray)),
        Span::styled("Enter", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" start  ", Style::default().fg(Color::DarkGray)),
        Span::styled("q", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" quit", Style::default().fg(Color::DarkGray)),
    ]))
    .alignment(Alignment::Center)
    .block(
        Block::default()
            .borders(Borders::TOP)
            .border_style(Style::default().fg(Color::DarkGray)),
    );
    frame.render_widget(help, chunks[4]);
}
