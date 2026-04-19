pub mod typing;
pub mod speedrun;
pub mod survival;
pub mod learning;

use std::time::{Duration, Instant};
use crate::data::commands::Command;
use typing::TypingState;

#[derive(Debug, Clone, PartialEq)]
pub enum GameMode {
    Speedrun,
    Survival,
    Learning,
}

impl GameMode {
    pub fn label(&self) -> &str {
        match self {
            GameMode::Speedrun => "Speedrun",
            GameMode::Survival => "Survival",
            GameMode::Learning => "Learning",
        }
    }
}

impl std::fmt::Display for GameMode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.label())
    }
}

#[derive(Debug, Clone)]
pub enum GamePhase {
    Countdown(u8),
    Typing,
    Finished(GameResult),
}

#[derive(Debug, Clone)]
pub struct GameState {
    pub mode: GameMode,
    pub phase: GamePhase,
    pub commands: Vec<Command>,
    pub current_round: usize,
    pub total_rounds: usize,
    pub typing: TypingState,
    pub round_results: Vec<RoundResult>,
    pub game_start: Instant,
    pub round_start: Instant,
    pub retries: u32,
}

#[derive(Debug, Clone)]
pub struct RoundResult {
    pub command: String,
    pub elapsed: Duration,
    pub accuracy: f64,
    pub retries: u32,
    pub completed: bool,
}

#[derive(Debug, Clone)]
pub struct GameResult {
    pub mode: GameMode,
    pub category: String,
    pub rounds: Vec<RoundResult>,
    pub total_time: Duration,
    pub overall_accuracy: f64,
    pub grade: char,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn game_mode_label() {
        assert_eq!(GameMode::Speedrun.label(), "Speedrun");
        assert_eq!(GameMode::Survival.label(), "Survival");
        assert_eq!(GameMode::Learning.label(), "Learning");
    }

    #[test]
    fn game_mode_display() {
        assert_eq!(format!("{}", GameMode::Speedrun), "Speedrun");
    }

    fn make_test_commands() -> Vec<Command> {
        vec![
            Command {
                text: "git add .".to_string(),
                difficulty: 1,
                description: "Stage all".to_string(),
            },
            Command {
                text: "git push".to_string(),
                difficulty: 1,
                description: "Push to remote".to_string(),
            },
            Command {
                text: "git pull".to_string(),
                difficulty: 1,
                description: "Pull from remote".to_string(),
            },
        ]
    }

    // === Speedrun tests ===

    #[test]
    fn speedrun_creates_correctly() {
        let cmds = make_test_commands();
        let state = GameState::new_speedrun(cmds.clone(), 3);
        assert_eq!(state.mode, GameMode::Speedrun);
        assert_eq!(state.current_round, 0);
        assert_eq!(state.total_rounds, 3);
        assert!(matches!(state.phase, GamePhase::Countdown(3)));
    }

    #[test]
    fn speedrun_correct_typing_completes_round() {
        let cmds = make_test_commands();
        let mut state = GameState::new_speedrun(cmds, 3);
        state.phase = GamePhase::Typing;

        // Type "git add ." correctly
        for ch in "git add .".chars() {
            state.speedrun_handle_char(ch);
        }

        assert_eq!(state.current_round, 1);
        assert_eq!(state.round_results.len(), 1);
        assert!(state.round_results[0].completed);
    }

    #[test]
    fn speedrun_error_causes_retry() {
        let cmds = make_test_commands();
        let mut state = GameState::new_speedrun(cmds, 3);
        state.phase = GamePhase::Typing;

        // Type "git add " correctly then wrong last char
        for ch in "git add x".chars() {
            state.speedrun_handle_char(ch);
        }

        // Should have retried (reset input, same round)
        assert_eq!(state.current_round, 0);
        assert_eq!(state.retries, 1);
        assert!(state.typing.input.is_empty());
    }

    #[test]
    fn speedrun_completes_game() {
        let cmds = make_test_commands();
        let mut state = GameState::new_speedrun(cmds, 2);
        state.phase = GamePhase::Typing;

        // Round 1
        for ch in "git add .".chars() {
            state.speedrun_handle_char(ch);
        }
        // Round 2
        for ch in "git push".chars() {
            state.speedrun_handle_char(ch);
        }

        assert!(matches!(state.phase, GamePhase::Finished(_)));
        if let GamePhase::Finished(ref result) = state.phase {
            assert_eq!(result.rounds.len(), 2);
            assert!((result.overall_accuracy - 100.0).abs() < f64::EPSILON);
        }
    }

    #[test]
    fn speedrun_backspace() {
        let cmds = make_test_commands();
        let mut state = GameState::new_speedrun(cmds, 3);
        state.phase = GamePhase::Typing;

        state.speedrun_handle_char('g');
        state.speedrun_handle_char('x');
        state.speedrun_handle_backspace();
        assert_eq!(state.typing.cursor_pos, 1);
        state.speedrun_handle_char('i');
        assert!(!state.typing.errors.contains(&1));
    }

    // === Survival tests ===

    #[test]
    fn survival_creates_correctly() {
        let cmds = make_test_commands();
        let state = GameState::new_survival(cmds, 3);
        assert_eq!(state.mode, GameMode::Survival);
        assert!(matches!(state.phase, GamePhase::Countdown(3)));
    }

    #[test]
    fn survival_error_ends_game() {
        let cmds = make_test_commands();
        let mut state = GameState::new_survival(cmds, 3);
        state.phase = GamePhase::Typing;

        state.survival_handle_char('g');
        state.survival_handle_char('x'); // wrong!

        assert!(matches!(state.phase, GamePhase::Finished(_)));
        if let GamePhase::Finished(ref result) = state.phase {
            assert!(!result.rounds.last().unwrap().completed);
        }
    }

    #[test]
    fn survival_correct_typing_proceeds() {
        let cmds = make_test_commands();
        let mut state = GameState::new_survival(cmds, 3);
        state.phase = GamePhase::Typing;

        for ch in "git add .".chars() {
            state.survival_handle_char(ch);
        }

        assert_eq!(state.current_round, 1);
        assert_eq!(state.round_results.len(), 1);
    }

    #[test]
    fn survival_completes_all_rounds() {
        let cmds = make_test_commands();
        let mut state = GameState::new_survival(cmds, 2);
        state.phase = GamePhase::Typing;

        for ch in "git add .".chars() {
            state.survival_handle_char(ch);
        }
        for ch in "git push".chars() {
            state.survival_handle_char(ch);
        }

        assert!(matches!(state.phase, GamePhase::Finished(_)));
    }

    // === Learning tests ===

    #[test]
    fn learning_creates_correctly() {
        let cmds = make_test_commands();
        let state = GameState::new_learning(cmds, 3);
        assert_eq!(state.mode, GameMode::Learning);
    }

    #[test]
    fn learning_wrong_char_rejected() {
        let cmds = make_test_commands();
        let mut state = GameState::new_learning(cmds, 3);
        state.phase = GamePhase::Typing;

        state.learning_handle_char('x'); // wrong, should not advance
        assert_eq!(state.typing.cursor_pos, 0);
        assert!(state.typing.input.is_empty());
    }

    #[test]
    fn learning_correct_char_accepted() {
        let cmds = make_test_commands();
        let mut state = GameState::new_learning(cmds, 3);
        state.phase = GamePhase::Typing;

        state.learning_handle_char('g'); // correct
        assert_eq!(state.typing.cursor_pos, 1);
    }

    #[test]
    fn learning_hint() {
        let cmds = make_test_commands();
        let state = GameState::new_learning(cmds, 3);
        assert_eq!(state.learning_hint(), Some('g'));
    }

    #[test]
    fn learning_description() {
        let cmds = make_test_commands();
        let state = GameState::new_learning(cmds, 3);
        assert_eq!(state.learning_description(), "Stage all");
    }

    #[test]
    fn learning_completes_round() {
        let cmds = make_test_commands();
        let mut state = GameState::new_learning(cmds, 2);
        state.phase = GamePhase::Typing;

        for ch in "git add .".chars() {
            state.learning_handle_char(ch);
        }

        assert_eq!(state.current_round, 1);
        assert_eq!(state.round_results.len(), 1);
    }

    // === Grade calculation in game results ===

    #[test]
    fn game_result_grade_assigned() {
        let cmds = make_test_commands();
        let mut state = GameState::new_speedrun(cmds, 1);
        state.phase = GamePhase::Typing;

        for ch in "git add .".chars() {
            state.speedrun_handle_char(ch);
        }

        if let GamePhase::Finished(ref result) = state.phase {
            // Grade should be one of S/A/B/C/D
            assert!("SABCD".contains(result.grade));
        } else {
            panic!("Expected Finished phase");
        }
    }
}
