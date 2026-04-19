use ratatui::layout::{Alignment, Constraint, Direction, Layout};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph};
use ratatui::Frame;

use crate::app::App;

pub fn render_category_select(app: &App, frame: &mut Frame) {
    let area = frame.area();

    let mode_label = app
        .selected_mode
        .as_ref()
        .map(|m| m.label())
        .unwrap_or("?");

    // Vertical layout
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(4),  // Title
            Constraint::Min(8),    // Category list
            Constraint::Length(3), // Help bar
        ])
        .split(area);

    // Title
    let title = Paragraph::new(vec![
        Line::from(""),
        Line::from(Span::styled(
            format!("  {} — Select Category", mode_label),
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
    ])
    .block(
        Block::default()
            .borders(Borders::BOTTOM)
            .border_style(Style::default().fg(Color::DarkGray)),
    );
    frame.render_widget(title, chunks[0]);

    // Center the category list
    let side_margin = if area.width > 60 {
        (area.width - 50) / 2
    } else {
        2
    };

    let list_area = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Length(side_margin),
            Constraint::Min(20),
            Constraint::Length(side_margin),
        ])
        .split(chunks[1]);

    let items: Vec<ListItem> = app
        .datasets
        .iter()
        .enumerate()
        .map(|(i, ds)| {
            let is_selected = i == app.category_index;
            let prefix = if is_selected { "  ▸ " } else { "    " };
            let style = if is_selected {
                Style::default()
                    .fg(Color::Yellow)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(Color::White)
            };
            let diff_color = match ds.difficulty.as_str() {
                "easy" => Color::Green,
                "medium" => Color::Yellow,
                "hard" => Color::Red,
                _ => Color::White,
            };

            let line = Line::from(vec![
                Span::raw(prefix),
                Span::styled(format!("{:<20}", ds.display_name), style),
                Span::styled(
                    format!("{:<8}", ds.difficulty),
                    Style::default().fg(diff_color),
                ),
                Span::styled(
                    format!("{} cmds", ds.commands.len()),
                    Style::default().fg(Color::DarkGray),
                ),
            ]);
            ListItem::new(vec![line, Line::from("")]) // spacing between items
        })
        .collect();

    let list = List::new(items);
    frame.render_widget(list, list_area[1]);

    // Help bar
    let help = Paragraph::new(Line::from(vec![
        Span::styled(" ↑↓", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" select  ", Style::default().fg(Color::DarkGray)),
        Span::styled("Enter", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" start  ", Style::default().fg(Color::DarkGray)),
        Span::styled("Esc", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" back", Style::default().fg(Color::DarkGray)),
    ]))
    .alignment(Alignment::Center)
    .block(
        Block::default()
            .borders(Borders::TOP)
            .border_style(Style::default().fg(Color::DarkGray)),
    );
    frame.render_widget(help, chunks[2]);
}
