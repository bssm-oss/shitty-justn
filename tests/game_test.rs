use cli_speedrun::data::commands::Command;
use cli_speedrun::game::{GameMode, GamePhase, GameState};
use cli_speedrun::config::calculate_grade;

fn test_commands() -> Vec<Command> {
    vec![
        Command {
            text: "git add .".to_string(),
            difficulty: 1,
            description: "Stage all".to_string(),
        },
        Command {
            text: "git push".to_string(),
            difficulty: 1,
            description: "Push".to_string(),
        },
        Command {
            text: "git pull".to_string(),
            difficulty: 1,
            description: "Pull".to_string(),
        },
    ]
}

#[test]
fn speedrun_round_progression() {
    let mut state = GameState::new_speedrun(test_commands(), 3);
    state.phase = GamePhase::Typing;

    // Complete round 1
    for ch in "git add .".chars() {
        state.speedrun_handle_char(ch);
    }
    assert_eq!(state.current_round, 1);
    assert_eq!(state.round_results.len(), 1);
    assert!(state.round_results[0].completed);
}

#[test]
fn speedrun_full_game() {
    let mut state = GameState::new_speedrun(test_commands(), 3);
    state.phase = GamePhase::Typing;

    for ch in "git add .".chars() {
        state.speedrun_handle_char(ch);
    }
    for ch in "git push".chars() {
        state.speedrun_handle_char(ch);
    }
    for ch in "git pull".chars() {
        state.speedrun_handle_char(ch);
    }

    match &state.phase {
        GamePhase::Finished(result) => {
            assert_eq!(result.rounds.len(), 3);
            assert!("SABCD".contains(result.grade));
        }
        _ => panic!("Expected Finished"),
    }
}

#[test]
fn speedrun_retry_on_error() {
    let mut state = GameState::new_speedrun(test_commands(), 3);
    state.phase = GamePhase::Typing;

    // Type "git add " correctly, then wrong char for last position
    for ch in "git add x".chars() {
        state.speedrun_handle_char(ch);
    }
    assert_eq!(state.current_round, 0); // still on round 0
    assert_eq!(state.retries, 1);
}

#[test]
fn survival_game_over_on_error() {
    let mut state = GameState::new_survival(test_commands(), 3);
    state.phase = GamePhase::Typing;

    state.survival_handle_char('g');
    state.survival_handle_char('x'); // wrong!

    assert!(matches!(state.phase, GamePhase::Finished(_)));
    if let GamePhase::Finished(ref result) = state.phase {
        assert!(!result.rounds.last().unwrap().completed);
    }
}

#[test]
fn survival_correct_sequence() {
    let mut state = GameState::new_survival(test_commands(), 2);
    state.phase = GamePhase::Typing;

    for ch in "git add .".chars() {
        state.survival_handle_char(ch);
    }
    assert_eq!(state.current_round, 1);
}

#[test]
fn learning_rejects_wrong_char() {
    let mut state = GameState::new_learning(test_commands(), 3);
    state.phase = GamePhase::Typing;

    state.learning_handle_char('x');
    assert_eq!(state.typing.cursor_pos, 0);
}

#[test]
fn learning_accepts_correct_char() {
    let mut state = GameState::new_learning(test_commands(), 3);
    state.phase = GamePhase::Typing;

    state.learning_handle_char('g');
    assert_eq!(state.typing.cursor_pos, 1);
}

#[test]
fn learning_hint_returns_next_char() {
    let state = GameState::new_learning(test_commands(), 3);
    assert_eq!(state.learning_hint(), Some('g'));
}

#[test]
fn grade_thresholds() {
    assert_eq!(calculate_grade(1.0, 99.0), 'S');
    assert_eq!(calculate_grade(1.8, 96.0), 'A');
    assert_eq!(calculate_grade(2.5, 92.0), 'B');
    assert_eq!(calculate_grade(4.0, 85.0), 'C');
    assert_eq!(calculate_grade(10.0, 50.0), 'D');
}

#[test]
fn game_mode_labels() {
    assert_eq!(GameMode::Speedrun.label(), "Speedrun");
    assert_eq!(GameMode::Survival.label(), "Survival");
    assert_eq!(GameMode::Learning.label(), "Learning");
}

#[test]
fn speedrun_with_single_round() {
    let mut state = GameState::new_speedrun(test_commands(), 1);
    state.phase = GamePhase::Typing;

    for ch in "git add .".chars() {
        state.speedrun_handle_char(ch);
    }

    assert!(matches!(state.phase, GamePhase::Finished(_)));
}
