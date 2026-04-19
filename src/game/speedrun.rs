use std::time::Instant;

use crate::data::commands::Command;
use crate::game::typing::TypingState;

use super::{GamePhase, GameResult, GameState, RoundResult};

impl GameState {
    /// Create a new speedrun game
    pub fn new_speedrun(commands: Vec<Command>, total_rounds: usize) -> Self {
        let first_target = commands
            .first()
            .map(|c| c.text.clone())
            .unwrap_or_default();

        let now = Instant::now();
        Self {
            mode: super::GameMode::Speedrun,
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

    /// Handle speedrun mode char input
    pub fn speedrun_handle_char(&mut self, ch: char) {
        self.typing.handle_char(ch);

        if self.typing.is_complete() {
            self.complete_round();
        } else if self.typing.is_all_typed() && self.typing.has_errors() {
            // Auto-retry: all chars typed but has errors
            self.retries += 1;
            self.typing.reset();
        }
    }

    /// Handle speedrun mode backspace
    pub fn speedrun_handle_backspace(&mut self) {
        self.typing.handle_backspace();
    }

    /// Complete the current round and advance
    fn complete_round(&mut self) {
        let elapsed = self.round_start.elapsed();
        let result = RoundResult {
            command: self.commands[self.current_round].text.clone(),
            elapsed,
            accuracy: self.typing.accuracy(),
            retries: self.retries,
            completed: true,
        };
        self.round_results.push(result);

        self.current_round += 1;
        self.retries = 0;

        if self.current_round >= self.total_rounds || self.current_round >= self.commands.len() {
            self.finish();
        } else {
            let next_target = &self.commands[self.current_round].text;
            self.typing = TypingState::new(next_target);
            self.round_start = Instant::now();
        }
    }

    /// Finish the game and compute results
    fn finish(&mut self) {
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
            category: String::new(), // filled by caller
            rounds: self.round_results.clone(),
            total_time,
            overall_accuracy,
            grade,
        };

        self.phase = GamePhase::Finished(result);
    }
}
