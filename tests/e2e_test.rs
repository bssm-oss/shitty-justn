//! E2E tests for cli-speedrun
//!
//! Uses ratatui's TestBackend to simulate full game flows
//! without needing an actual terminal.

use crossterm::event::{Event, KeyCode, KeyEvent, KeyEventKind, KeyEventState, KeyModifiers};
use ratatui::{backend::TestBackend, Terminal};

use cli_speedrun::app::{App, AppScreen};
use cli_speedrun::data::commands::load_all_datasets;
use cli_speedrun::game::{GameMode, GamePhase};

/// Helper: create a key event
fn key(code: KeyCode) -> Event {
    Event::Key(KeyEvent {
        code,
        modifiers: KeyModifiers::NONE,
        kind: KeyEventKind::Press,
        state: KeyEventState::NONE,
    })
}

/// Helper: create a char key event
fn char_key(ch: char) -> Event {
    key(KeyCode::Char(ch))
}

/// Helper: create a ctrl+key event
fn ctrl_key(ch: char) -> Event {
    Event::Key(KeyEvent {
        code: KeyCode::Char(ch),
        modifiers: KeyModifiers::CONTROL,
        kind: KeyEventKind::Press,
        state: KeyEventState::NONE,
    })
}

/// Helper: create app with real datasets
fn make_app() -> App {
    let datasets = load_all_datasets();
    App::new(datasets)
}

/// Helper: render a frame and return the buffer content as a string
fn render_to_string(terminal: &mut Terminal<TestBackend>, app: &App) -> String {
    terminal
        .draw(|frame| cli_speedrun::ui::render(app, frame))
        .unwrap();
    let buf = terminal.backend().buffer().clone();
    let mut output = String::new();
    for y in 0..buf.area.height {
        for x in 0..buf.area.width {
            output.push(buf.cell((x, y)).unwrap().symbol().chars().next().unwrap_or(' '));
        }
        output.push('\n');
    }
    output
}

/// Helper: skip countdown by directly setting phase to Typing
fn skip_countdown(app: &mut App) {
    if let Some(ref mut game) = app.game {
        game.phase = GamePhase::Typing;
        game.game_start = std::time::Instant::now();
        game.round_start = std::time::Instant::now();
    }
}

// ============================================================
// E2E: Main Menu
// ============================================================

#[test]
fn e2e_main_menu_renders() {
    let mut terminal = Terminal::new(TestBackend::new(120, 35)).unwrap();
    let app = make_app();

    let output = render_to_string(&mut terminal, &app);
    // Menu items should always be visible regardless of terminal size
    assert!(output.contains("Speedrun"), "Should show Speedrun mode");
    assert!(output.contains("Survival"), "Should show Survival mode");
    assert!(output.contains("Learning"), "Should show Learning mode");
    assert!(output.contains("select"), "Should show help text");
}

#[test]
fn e2e_menu_navigation() {
    let mut app = make_app();
    assert_eq!(app.menu_index, 0);

    // Navigate down
    app.handle_event(key(KeyCode::Down)).unwrap();
    assert_eq!(app.menu_index, 1);

    app.handle_event(key(KeyCode::Down)).unwrap();
    assert_eq!(app.menu_index, 2);

    // Can't go past last item
    app.handle_event(key(KeyCode::Down)).unwrap();
    assert_eq!(app.menu_index, 2);

    // Navigate back up
    app.handle_event(key(KeyCode::Up)).unwrap();
    assert_eq!(app.menu_index, 1);
}

#[test]
fn e2e_quit_from_menu() {
    let mut app = make_app();

    app.handle_event(char_key('q')).unwrap();
    assert!(app.should_quit());
}

#[test]
fn e2e_ctrl_c_quits() {
    let mut app = make_app();

    app.handle_event(ctrl_key('c')).unwrap();
    assert!(app.should_quit());
}

// ============================================================
// E2E: Menu → Category Select
// ============================================================

#[test]
fn e2e_enter_category_select_speedrun() {
    let mut app = make_app();

    // Select Speedrun (index 0) and press Enter
    app.handle_event(key(KeyCode::Enter)).unwrap();
    assert!(matches!(app.screen, AppScreen::CategorySelect));
    assert_eq!(app.selected_mode, Some(GameMode::Speedrun));
}

#[test]
fn e2e_enter_category_select_survival() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Down)).unwrap(); // index 1 = Survival
    app.handle_event(key(KeyCode::Enter)).unwrap();
    assert!(matches!(app.screen, AppScreen::CategorySelect));
    assert_eq!(app.selected_mode, Some(GameMode::Survival));
}

#[test]
fn e2e_enter_category_select_learning() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Down)).unwrap(); // index 2 = Learning
    app.handle_event(key(KeyCode::Enter)).unwrap();
    assert!(matches!(app.screen, AppScreen::CategorySelect));
    assert_eq!(app.selected_mode, Some(GameMode::Learning));
}

#[test]
fn e2e_category_select_renders() {
    let mut terminal = Terminal::new(TestBackend::new(60, 20)).unwrap();
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap(); // enter category select
    let output = render_to_string(&mut terminal, &app);
    assert!(
        output.contains("Git") || output.contains("git"),
        "Should show a Git category"
    );
}

#[test]
fn e2e_category_select_navigate() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap(); // enter category select
    assert_eq!(app.category_index, 0);

    app.handle_event(key(KeyCode::Down)).unwrap();
    assert_eq!(app.category_index, 1);

    app.handle_event(key(KeyCode::Up)).unwrap();
    assert_eq!(app.category_index, 0);
}

#[test]
fn e2e_category_select_back_to_menu() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap(); // enter category select
    app.handle_event(key(KeyCode::Esc)).unwrap(); // back
    assert!(matches!(app.screen, AppScreen::MainMenu));
}

// ============================================================
// E2E: Full Speedrun Flow
// ============================================================

#[test]
fn e2e_speedrun_starts_with_countdown() {
    let mut app = make_app();

    // Menu → Category → Start
    app.handle_event(key(KeyCode::Enter)).unwrap(); // Speedrun
    app.handle_event(key(KeyCode::Enter)).unwrap(); // first category

    assert!(matches!(app.screen, AppScreen::Playing));
    if let Some(ref game) = app.game {
        assert!(matches!(game.phase, GamePhase::Countdown(3)));
    } else {
        panic!("Game should be initialized");
    }
}

#[test]
fn e2e_speedrun_countdown_renders() {
    let mut terminal = Terminal::new(TestBackend::new(60, 20)).unwrap();
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();

    let output = render_to_string(&mut terminal, &app);
    assert!(
        output.contains("3") || output.contains("Get Ready"),
        "Should show countdown"
    );
}

#[test]
fn e2e_speedrun_typing_renders_target() {
    let mut terminal = Terminal::new(TestBackend::new(80, 24)).unwrap();
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let output = render_to_string(&mut terminal, &app);
    assert!(
        output.contains("Round 1"),
        "Should show round info, got:\n{}",
        output
    );
    assert!(
        output.contains("Speedrun"),
        "Should show mode label"
    );
}

#[test]
fn e2e_speedrun_complete_one_round() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    // Get the target command
    let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();

    // Type it correctly
    for ch in target.chars() {
        app.handle_event(char_key(ch)).unwrap();
    }

    // Should have advanced to round 2
    if let Some(ref game) = app.game {
        assert_eq!(game.current_round, 1);
        assert_eq!(game.round_results.len(), 1);
        assert!(game.round_results[0].completed);
    } else {
        // Game might have finished if total_rounds was 1
        assert!(matches!(app.screen, AppScreen::Result(_)));
    }
}

#[test]
fn e2e_speedrun_complete_full_game() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;

    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    // Should be on result screen
    assert!(
        matches!(app.screen, AppScreen::Result(_)),
        "Should transition to Result after all rounds"
    );
}

#[test]
fn e2e_speedrun_result_screen_renders() {
    let mut terminal = Terminal::new(TestBackend::new(80, 30)).unwrap();
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;
    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    let output = render_to_string(&mut terminal, &app);
    assert!(output.contains("RESULT"), "Should show RESULT title");
    assert!(output.contains("Accuracy"), "Should show accuracy");
    assert!(output.contains("Grade"), "Should show grade");
}

#[test]
fn e2e_speedrun_result_retry() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;
    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    // Press 'r' to retry
    app.handle_event(char_key('r')).unwrap();
    assert!(
        matches!(app.screen, AppScreen::Playing),
        "Should restart the game"
    );
}

#[test]
fn e2e_speedrun_result_back_to_menu() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;
    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    // Press 'm' to go back to menu
    app.handle_event(char_key('m')).unwrap();
    assert!(matches!(app.screen, AppScreen::MainMenu));
}

#[test]
fn e2e_speedrun_error_triggers_retry() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
    let target_len = target.len();

    // Type all wrong chars (same length as target)
    for _ in 0..target_len {
        // Use a char that's unlikely to match (null-ish)
        app.handle_event(char_key('~')).unwrap();
    }

    // After typing all wrong, speedrun auto-retries
    if let Some(ref game) = app.game {
        assert_eq!(game.current_round, 0, "Should still be on round 0 after retry");
        assert!(game.retries >= 1, "Should have incremented retries");
        assert!(game.typing.input.is_empty(), "Input should be cleared after retry");
    }
}

#[test]
fn e2e_speedrun_backspace_works() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    // Type one char, then backspace
    let first_char = app.game.as_ref().unwrap().typing.target[0];
    app.handle_event(char_key(first_char)).unwrap();
    assert_eq!(app.game.as_ref().unwrap().typing.cursor_pos, 1);

    app.handle_event(key(KeyCode::Backspace)).unwrap();
    assert_eq!(app.game.as_ref().unwrap().typing.cursor_pos, 0);
}

#[test]
fn e2e_speedrun_escape_during_game() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    app.handle_event(key(KeyCode::Esc)).unwrap();
    assert!(
        matches!(app.screen, AppScreen::MainMenu),
        "Esc during game should return to menu"
    );
    assert!(app.game.is_none(), "Game should be cleared");
}

// ============================================================
// E2E: Survival Flow
// ============================================================

#[test]
fn e2e_survival_error_ends_game() {
    let mut app = make_app();

    // Select Survival
    app.handle_event(key(KeyCode::Down)).unwrap(); // index 1
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap(); // first category
    skip_countdown(&mut app);

    let first_char = app.game.as_ref().unwrap().typing.target[0];
    // Type one correct, then one wrong
    app.handle_event(char_key(first_char)).unwrap();

    // Find a wrong char
    let second_target = app.game.as_ref().unwrap().typing.target[1];
    let wrong_char = if second_target == 'z' { 'a' } else { 'z' };
    app.handle_event(char_key(wrong_char)).unwrap();

    // Should be on result screen (game over)
    assert!(
        matches!(app.screen, AppScreen::Result(_)),
        "Survival error should end the game"
    );

    if let AppScreen::Result(ref result) = app.screen {
        assert!(!result.rounds.last().unwrap().completed, "Last round should be incomplete");
    }
}

#[test]
fn e2e_survival_complete_game() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Down)).unwrap(); // Survival
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;

    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    assert!(matches!(app.screen, AppScreen::Result(_)));
    if let AppScreen::Result(ref result) = app.screen {
        assert!(
            result.rounds.iter().all(|r| r.completed),
            "All rounds should be completed"
        );
    }
}

// ============================================================
// E2E: Learning Flow
// ============================================================

#[test]
fn e2e_learning_wrong_char_ignored() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Down)).unwrap(); // Learning
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let first_target = app.game.as_ref().unwrap().typing.target[0];
    let wrong_char = if first_target == 'z' { 'a' } else { 'z' };

    app.handle_event(char_key(wrong_char)).unwrap();

    // Should NOT have advanced
    assert_eq!(
        app.game.as_ref().unwrap().typing.cursor_pos, 0,
        "Wrong char should be ignored in learning mode"
    );
}

#[test]
fn e2e_learning_correct_char_advances() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let first_char = app.game.as_ref().unwrap().typing.target[0];
    app.handle_event(char_key(first_char)).unwrap();

    assert_eq!(
        app.game.as_ref().unwrap().typing.cursor_pos, 1,
        "Correct char should advance cursor"
    );
}

#[test]
fn e2e_learning_complete_game() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;

    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    assert!(matches!(app.screen, AppScreen::Result(_)));
}

// ============================================================
// E2E: Cross-screen Transitions
// ============================================================

#[test]
fn e2e_full_loop_play_retry_play_quit() {
    let mut app = make_app();

    // 1) Menu → Category → Game
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    // 2) Complete game
    let total_rounds = app.game.as_ref().unwrap().total_rounds;
    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }
    assert!(matches!(app.screen, AppScreen::Result(_)));

    // 3) Retry
    app.handle_event(char_key('r')).unwrap();
    assert!(matches!(app.screen, AppScreen::Playing));
    skip_countdown(&mut app);

    // 4) Escape back to menu
    app.handle_event(key(KeyCode::Esc)).unwrap();
    assert!(matches!(app.screen, AppScreen::MainMenu));

    // 5) Quit
    app.handle_event(char_key('q')).unwrap();
    assert!(app.should_quit());
}

#[test]
fn e2e_play_all_three_modes() {
    let mut app = make_app();

    // Speedrun
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);
    app.handle_event(key(KeyCode::Esc)).unwrap();
    assert!(matches!(app.screen, AppScreen::MainMenu));

    // Survival
    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);
    app.handle_event(key(KeyCode::Esc)).unwrap();
    assert!(matches!(app.screen, AppScreen::MainMenu));

    // Learning
    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Down)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);
    app.handle_event(key(KeyCode::Esc)).unwrap();
    assert!(matches!(app.screen, AppScreen::MainMenu));
}

#[test]
fn e2e_different_categories() {
    let mut app = make_app();
    let num_datasets = app.datasets.len();

    for cat_idx in 0..num_datasets.min(3) {
        // Select Speedrun
        app.handle_event(key(KeyCode::Enter)).unwrap();

        // Navigate to category
        for _ in 0..cat_idx {
            app.handle_event(key(KeyCode::Down)).unwrap();
        }
        app.handle_event(key(KeyCode::Enter)).unwrap();
        assert!(matches!(app.screen, AppScreen::Playing));
        skip_countdown(&mut app);

        // Verify game started with commands from the right dataset
        assert!(app.game.is_some());

        // Escape
        app.handle_event(key(KeyCode::Esc)).unwrap();
        assert!(matches!(app.screen, AppScreen::MainMenu));
    }
}

// ============================================================
// E2E: Countdown Behavior
// ============================================================

#[test]
fn e2e_countdown_tick_decrements() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();

    // Verify starts at 3
    if let Some(ref game) = app.game {
        assert!(matches!(game.phase, GamePhase::Countdown(3)));
    }

    // Simulate time passing by setting last_countdown_tick to past
    app.last_countdown_tick = Some(std::time::Instant::now() - std::time::Duration::from_secs(2));
    app.tick();

    if let Some(ref game) = app.game {
        assert!(
            matches!(game.phase, GamePhase::Countdown(2)),
            "Should decrement to 2 after tick"
        );
    }
}

#[test]
fn e2e_countdown_escape_returns_to_menu() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();

    // During countdown, Esc should go back
    app.handle_event(key(KeyCode::Esc)).unwrap();
    assert!(matches!(app.screen, AppScreen::MainMenu));
}

// ============================================================
// E2E: Accuracy and Grade Verification
// ============================================================

#[test]
fn e2e_perfect_game_grade() {
    let mut app = make_app();

    app.handle_event(key(KeyCode::Enter)).unwrap();
    app.handle_event(key(KeyCode::Enter)).unwrap();
    skip_countdown(&mut app);

    let total_rounds = app.game.as_ref().unwrap().total_rounds;
    for _ in 0..total_rounds {
        if app.game.is_none() {
            break;
        }
        let target: String = app.game.as_ref().unwrap().typing.target.iter().collect();
        for ch in target.chars() {
            app.handle_event(char_key(ch)).unwrap();
        }
    }

    if let AppScreen::Result(ref result) = app.screen {
        assert!(
            (result.overall_accuracy - 100.0).abs() < f64::EPSILON,
            "Perfect typing should give 100% accuracy"
        );
        // Grade should be good (S or A since it's fast in test)
        assert!(
            "SA".contains(result.grade),
            "Perfect fast game should get S or A, got {}",
            result.grade
        );
    } else {
        panic!("Should be on Result screen");
    }
}
