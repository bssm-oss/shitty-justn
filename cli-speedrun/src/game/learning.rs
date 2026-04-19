use std::time::Instant;

use crate::data::commands::Command;
use crate::game::typing::TypingState;

use super::{GamePhase, GameResult, GameState, RoundResult};

impl GameState {
    /// Create a new learning game
    pub fn new_learning(commands: Vec<Command>, total_rounds: usize) -> Self {
        let first_target = commands
            .first()
            .map(|c| c.text.clone())
            .unwrap_or_default();

        let now = Instant::now();
        Self {
            mode: super::GameMode::Learning,
            phase: GamePhase::Countdown(crate::config::COUNTDOWN_SECS),
            commands,
            current_round: 0,
            total_rounds,
            typing: TypingState::new(&first_target),
            round_results: Vec::new(),
            game_start: now,
            round_start: now,
            retries: 0,
        }
    }

    /// Handle learning mode char input
    /// In learning mode, wrong chars are rejected — must type correct char to proceed.
    pub fn learning_handle_char(&mut self, ch: char) {
        let pos = self.typing.cursor_pos;
        if pos >= self.typing.target.len() {
            return;
        }

        self.typing.total_keystrokes += 1;

        if ch == self.typing.target[pos] {
            self.typing.correct_keystrokes += 1;
            self.typing.input.push(ch);
            self.typing.cursor_pos += 1;
        }
        // Wrong char is simply ignored (user must type correct char)
        // The hint is shown in the UI

        if self.typing.is_complete() {
            self.learning_complete_round();
        }
    }

    /// Get the hint character for current position in learning mode
    pub fn learning_hint(&self) -> Option<char> {
        if self.typing.cursor_pos < self.typing.target.len() {
            Some(self.typing.target[self.typing.cursor_pos])
        } else {
            None
        }
    }

    /// Get the current command description for learning mode
    pub fn learning_description(&self) -> &str {
        if self.current_round < self.commands.len() {
            &self.commands[self.current_round].description
        } else {
            ""
        }
    }

    fn learning_complete_round(&mut self) {
        let elapsed = self.round_start.elapsed();
        let result = RoundResult {
            command: self.commands[self.current_round].text.clone(),
            elapsed,
            accuracy: self.typing.accuracy(),
            retries: 0,
            completed: true,
        };
        self.round_results.push(result);
        self.current_round += 1;

        if self.current_round >= self.total_rounds || self.current_round >= self.commands.len() {
            self.learning_finish();
        } else {
            let next_target = &self.commands[self.current_round].text;
            self.typing = TypingState::new(next_target);
            self.round_start = Instant::now();
        }
    }

    fn learning_finish(&mut self) {
        let total_time = self.game_start.elapsed();
        let overall_accuracy = if self.round_results.is_empty() {
            100.0
        } else {
            self.round_results.iter().map(|r| r.accuracy).sum::<f64>()
                / self.round_results.len() as f64
        };

        let avg_secs = if self.round_results.is_empty() {
            0.0
        } else {
            total_time.as_secs_f64() / self.round_results.len() as f64
        };

        let grade = crate::config::calculate_grade(avg_secs, overall_accuracy);

        let result = GameResult {
            mode: self.mode.clone(),
            category: String::new(),
            rounds: self.round_results.clone(),
            total_time,
            overall_accuracy,
            grade,
        };

        self.phase = GamePhase::Finished(result);
    }
}
