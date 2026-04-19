use ratatui::layout::{Alignment, Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph, Clear};
use ratatui::Frame;

use crate::app::App;
use crate::game::typing::CharStatus;
use crate::game::{GameMode, GamePhase};

pub fn render(app: &App, frame: &mut Frame) {
    let game = match &app.game {
        Some(g) => g,
        None => return,
    };

    let area = frame.area();

    match &game.phase {
        GamePhase::Countdown(count) => render_countdown(*count, frame, area),
        GamePhase::Typing => render_typing(app, frame, area),
        GamePhase::Finished(_) => {}
    }
}

fn render_countdown(count: u8, frame: &mut Frame, area: Rect) {
    frame.render_widget(Clear, area);

    // Center the countdown number in the full screen
    let vert = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage(40),
            Constraint::Length(5),
            Constraint::Percentage(40),
        ])
        .split(area);

    let horiz = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Percentage(35),
            Constraint::Percentage(30),
            Constraint::Percentage(35),
        ])
        .split(vert[1]);

    let big_number = format!("{}", count);
    let paragraph = Paragraph::new(vec![
        Line::from(""),
        Line::from(Span::styled(
            big_number,
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(""),
        Line::from(Span::styled(
            "Get Ready!",
            Style::default().fg(Color::DarkGray),
        )),
    ])
    .alignment(Alignment::Center)
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Yellow))
            .title(" Starting... "),
    );
    frame.render_widget(paragraph, horiz[1]);
}

fn render_typing(app: &App, frame: &mut Frame, area: Rect) {
    let game = match &app.game {
        Some(g) => g,
        None => return,
    };

    // Main 3-section layout with flexible typing area
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),  // Title bar
            Constraint::Min(10),   // Typing area (takes all remaining space)
            Constraint::Length(3), // Stats bar
        ])
        .split(area);

    // === Title bar ===
    let elapsed = game.game_start.elapsed().as_secs_f64();
    let mode_label = game.mode.label();
    let round_info = format!(
        " {} | Round {}/{} ",
        mode_label,
        game.current_round + 1,
        game.total_rounds,
    );
    let time_info = format!(" {:.1}s ", elapsed);

    let title_bar = Paragraph::new(Line::from(vec![
        Span::styled(
            round_info,
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        ),
        Span::styled(
            "│",
            Style::default().fg(Color::DarkGray),
        ),
        Span::styled(
            time_info,
            Style::default()
                .fg(Color::White)
                .add_modifier(Modifier::BOLD),
        ),
    ]))
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Cyan)),
    );
    frame.render_widget(title_bar, chunks[0]);

    // === Typing area — centered vertically ===
    let typing_area = chunks[1];
    let typing_height = typing_area.height;

    // Calculate vertical centering offsets
    let content_height: u16 = if game.mode == GameMode::Learning { 5 } else { 3 };
    let top_pad = typing_height.saturating_sub(content_height) / 2;
    let bottom_pad = typing_height.saturating_sub(content_height).saturating_sub(top_pad);

    let typing_chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(top_pad),       // top padding
            Constraint::Length(content_height), // content
            Constraint::Length(bottom_pad),    // bottom padding
        ])
        .split(typing_area);

    let content_area = typing_chunks[1];

    // Horizontal centering — add side margins
    let side_margin = if typing_area.width > 80 {
        (typing_area.width - 80) / 2
    } else {
        2
    };
    let centered = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Length(side_margin),
            Constraint::Min(20),
            Constraint::Length(side_margin),
        ])
        .split(content_area);

    let text_area = centered[1];

    if game.mode == GameMode::Learning {
        // Learning mode: description + hint + target + input
        let learn_chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(1), // description
                Constraint::Length(1), // spacer
                Constraint::Length(1), // target
                Constraint::Length(1), // input
                Constraint::Length(1), // hint
            ])
            .split(text_area);

        let desc = game.learning_description();
        let desc_line = Paragraph::new(Line::from(Span::styled(
            desc,
            Style::default().fg(Color::Cyan),
        )));
        frame.render_widget(desc_line, learn_chunks[0]);

        render_target_line(game, frame, learn_chunks[2]);
        render_input_line(game, frame, learn_chunks[3]);

        // Hint line
        let hint = game
            .learning_hint()
            .map(|c| format!("hint: press '{}'", c))
            .unwrap_or_default();
        let hint_line = Paragraph::new(Line::from(Span::styled(
            hint,
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::DIM),
        )));
        frame.render_widget(hint_line, learn_chunks[4]);
    } else {
        // Speedrun/Survival: target + spacer + input
        let play_chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(1), // target
                Constraint::Length(1), // spacer
                Constraint::Length(1), // input
            ])
            .split(text_area);

        render_target_line(game, frame, play_chunks[0]);
        render_input_line(game, frame, play_chunks[2]);
    }

    // === Stats bar ===
    let avg_time = if !game.round_results.is_empty() {
        let total: f64 = game
            .round_results
            .iter()
            .map(|r| r.elapsed.as_secs_f64())
            .sum();
        total / game.round_results.len() as f64
    } else {
        0.0
    };

    let accuracy = game.typing.accuracy();
    let retries_info = if game.retries > 0 {
        format!("  │  Retries: {}", game.retries)
    } else {
        String::new()
    };

    let stats = Line::from(vec![
        Span::styled(
            format!("  Accuracy: {:.0}%", accuracy),
            Style::default().fg(if accuracy >= 90.0 {
                Color::Green
            } else if accuracy >= 70.0 {
                Color::Yellow
            } else {
                Color::Red
            }),
        ),
        Span::styled("  │  ", Style::default().fg(Color::DarkGray)),
        Span::styled(
            format!("Avg: {:.1}s", avg_time),
            Style::default().fg(Color::White),
        ),
        Span::styled(retries_info, Style::default().fg(Color::Yellow)),
    ]);

    let stats_bar = Paragraph::new(stats).block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::DarkGray)),
    );
    frame.render_widget(stats_bar, chunks[2]);
}

fn render_target_line(
    game: &crate::game::GameState,
    frame: &mut Frame,
    area: Rect,
) {
    let target_text: String = game.typing.target.iter().collect();
    let target_line = Paragraph::new(Line::from(Span::styled(
        target_text,
        Style::default()
            .fg(Color::DarkGray)
            .add_modifier(Modifier::DIM),
    )));
    frame.render_widget(target_line, area);
}

fn render_input_line(
    game: &crate::game::GameState,
    frame: &mut Frame,
    area: Rect,
) {
    let mut spans = Vec::new();
    for (idx, &target_ch) in game.typing.target.iter().enumerate() {
        let status = game.typing.char_status(idx);
        let ch = if idx < game.typing.input.len() {
            game.typing.input[idx]
        } else {
            target_ch
        };

        let style = match status {
            CharStatus::Correct => Style::default().fg(Color::Green).add_modifier(Modifier::BOLD),
            CharStatus::Wrong => Style::default()
                .fg(Color::White)
                .bg(Color::Red)
                .add_modifier(Modifier::BOLD),
            CharStatus::Current => Style::default()
                .fg(Color::White)
                .add_modifier(Modifier::REVERSED)
                .add_modifier(Modifier::BOLD),
            CharStatus::Pending => Style::default().fg(Color::DarkGray),
        };

        spans.push(Span::styled(ch.to_string(), style));
    }

    let input_line = Paragraph::new(Line::from(spans));
    frame.render_widget(input_line, area);
}
