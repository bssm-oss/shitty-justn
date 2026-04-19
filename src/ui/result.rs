use ratatui::layout::{Alignment, Constraint, Direction, Layout};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Cell, Paragraph, Row, Table};
use ratatui::Frame;

use crate::game::GameResult;

pub fn render(result: &GameResult, frame: &mut Frame) {
    let area = frame.area();

    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),  // Title
            Constraint::Length(8),  // Summary stats
            Constraint::Min(8),    // Round details
            Constraint::Length(3), // Help
        ])
        .split(area);

    // Title
    let title = Paragraph::new(Line::from(Span::styled(
        " RESULT",
        Style::default()
            .fg(Color::Cyan)
            .add_modifier(Modifier::BOLD),
    )))
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Cyan)),
    );
    frame.render_widget(title, chunks[0]);

    // Summary — centered
    let grade_color = match result.grade {
        'S' => Color::Magenta,
        'A' => Color::Green,
        'B' => Color::Cyan,
        'C' => Color::Yellow,
        _ => Color::Red,
    };

    let grade_label = match result.grade {
        'S' => "★ S — Perfect!",
        'A' => "★ A — Excellent",
        'B' => "★ B — Good",
        'C' => "★ C — Okay",
        _ => "★ D — Keep practicing",
    };

    let side_margin = if area.width > 50 { 4u16 } else { 1 };

    let summary = Paragraph::new(vec![
        Line::from(""),
        Line::from(vec![
            Span::raw("    Total Time:   "),
            Span::styled(
                format!("{:.1}s", result.total_time.as_secs_f64()),
                Style::default()
                    .fg(Color::White)
                    .add_modifier(Modifier::BOLD),
            ),
        ]),
        Line::from(vec![
            Span::raw("    Accuracy:     "),
            Span::styled(
                format!("{:.0}%", result.overall_accuracy),
                Style::default()
                    .fg(if result.overall_accuracy >= 95.0 {
                        Color::Green
                    } else if result.overall_accuracy >= 80.0 {
                        Color::Yellow
                    } else {
                        Color::Red
                    })
                    .add_modifier(Modifier::BOLD),
            ),
        ]),
        Line::from(vec![
            Span::raw("    Grade:        "),
            Span::styled(
                grade_label,
                Style::default()
                    .fg(grade_color)
                    .add_modifier(Modifier::BOLD),
            ),
        ]),
        Line::from(vec![
            Span::raw("    Rounds:       "),
            Span::styled(
                format!(
                    "{}/{}",
                    result.rounds.iter().filter(|r| r.completed).count(),
                    result.rounds.len()
                ),
                Style::default().fg(Color::White),
            ),
        ]),
        Line::from(""),
    ]);
    frame.render_widget(summary, chunks[1]);

    // Round details table — with margins
    let table_area = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Length(side_margin),
            Constraint::Min(30),
            Constraint::Length(side_margin),
        ])
        .split(chunks[2]);

    let header = Row::new(vec![
        Cell::from(Span::styled(
            " #",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Cell::from(Span::styled(
            "Command",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Cell::from(Span::styled(
            "Time",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Cell::from(Span::styled(
            "Status",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
    ]);

    let rows: Vec<Row> = result
        .rounds
        .iter()
        .enumerate()
        .map(|(i, r)| {
            let status = if r.completed {
                if r.retries > 0 {
                    Span::styled(
                        format!("↻ x{}", r.retries),
                        Style::default().fg(Color::Yellow),
                    )
                } else {
                    Span::styled("✓", Style::default().fg(Color::Green))
                }
            } else {
                Span::styled("✗ FAIL", Style::default().fg(Color::Red))
            };

            let max_cmd_len = (table_area[1].width as usize).saturating_sub(25).max(10);
            let cmd_display = if r.command.len() > max_cmd_len {
                format!("{}...", &r.command[..max_cmd_len.saturating_sub(3)])
            } else {
                r.command.clone()
            };

            Row::new(vec![
                Cell::from(format!(" {}", i + 1)),
                Cell::from(cmd_display),
                Cell::from(format!("{:.1}s", r.elapsed.as_secs_f64())),
                Cell::from(status),
            ])
        })
        .collect();

    let table = Table::new(
        rows,
        [
            Constraint::Length(4),
            Constraint::Min(15),
            Constraint::Length(8),
            Constraint::Length(10),
        ],
    )
    .header(header)
    .block(
        Block::default()
            .borders(Borders::TOP)
            .border_style(Style::default().fg(Color::DarkGray))
            .title(" Round Details "),
    );
    frame.render_widget(table, table_area[1]);

    // Help bar
    let help = Paragraph::new(Line::from(vec![
        Span::styled("r", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" retry  ", Style::default().fg(Color::DarkGray)),
        Span::styled("m", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" menu  ", Style::default().fg(Color::DarkGray)),
        Span::styled("q", Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD)),
        Span::styled(" quit", Style::default().fg(Color::DarkGray)),
    ]))
    .alignment(Alignment::Center)
    .block(
        Block::default()
            .borders(Borders::TOP)
            .border_style(Style::default().fg(Color::DarkGray)),
    );
    frame.render_widget(help, chunks[3]);
}
