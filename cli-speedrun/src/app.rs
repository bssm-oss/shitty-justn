use crossterm::event::{Event, KeyCode, KeyEvent, KeyModifiers};
use rand::seq::SliceRandom;
use std::time::Instant;

use crate::config::DEFAULT_ROUNDS;
use crate::data::commands::CommandSet;
use crate::game::{GameMode, GamePhase, GameResult, GameState};

#[derive(Debug, Clone)]
pub enum AppScreen {
    MainMenu,
    CategorySelect,
    Playing,
    Result(GameResult),
    Quitting,
}

pub struct App {
    pub screen: AppScreen,
    pub datasets: Vec<CommandSet>,
    pub game: Option<GameState>,
    pub menu_index: usize,
    pub category_index: usize,
    pub selected_mode: Option<GameMode>,
    pub last_countdown_tick: Option<Instant>,
}

impl App {
    pub fn new(datasets: Vec<CommandSet>) -> Self {
        Self {
            screen: AppScreen::MainMenu,
            datasets,
            game: None,
            menu_index: 0,
            category_index: 0,
            selected_mode: None,
            last_countdown_tick: None,
        }
    }

    pub fn should_quit(&self) -> bool {
        matches!(self.screen, AppScreen::Quitting)
    }

    pub fn handle_event(&mut self, event: Event) -> anyhow::Result<()> {
        if let Event::Key(key) = event {
            // Global quit on Ctrl+C
            if key.modifiers.contains(KeyModifiers::CONTROL) && key.code == KeyCode::Char('c') {
                self.screen = AppScreen::Quitting;
                return Ok(());
            }

            match &self.screen {
                AppScreen::MainMenu => self.handle_menu_key(key),
                AppScreen::CategorySelect => self.handle_category_select_key(key),
                AppScreen::Playing => self.handle_playing_key(key),
                AppScreen::Result(_) => self.handle_result_key(key),
                AppScreen::Quitting => {}
            }
        }
        Ok(())
    }

    fn handle_menu_key(&mut self, key: KeyEvent) {
        match key.code {
            KeyCode::Char('q') | KeyCode::Esc => {
                self.screen = AppScreen::Quitting;
            }
            KeyCode::Up => {
                if self.menu_index > 0 {
                    self.menu_index -= 1;
                }
            }
            KeyCode::Down => {
                if self.menu_index < 2 {
                    self.menu_index += 1;
                }
            }
            KeyCode::Enter => {
                self.selected_mode = Some(match self.menu_index {
                    0 => GameMode::Speedrun,
                    1 => GameMode::Survival,
                    _ => GameMode::Learning,
                });
                self.category_index = 0;
                self.screen = AppScreen::CategorySelect;
            }
            _ => {}
        }
    }

    fn handle_category_select_key(&mut self, key: KeyEvent) {
        match key.code {
            KeyCode::Char('q') | KeyCode::Esc => {
                self.screen = AppScreen::MainMenu;
            }
            KeyCode::Up => {
                if self.category_index > 0 {
                    self.category_index -= 1;
                }
            }
            KeyCode::Down => {
                if self.category_index < self.datasets.len().saturating_sub(1) {
                    self.category_index += 1;
                }
            }
            KeyCode::Enter => {
                self.start_game();
            }
            _ => {}
        }
    }

    fn handle_playing_key(&mut self, key: KeyEvent) {
        let game = match &mut self.game {
            Some(g) => g,
            None => return,
        };

        // Allow quit during countdown
        if matches!(game.phase, GamePhase::Countdown(_)) {
            if key.code == KeyCode::Esc || key.code == KeyCode::Char('q') {
                self.screen = AppScreen::MainMenu;
                self.game = None;
            }
            return;
        }

        // During typing phase
        if !matches!(game.phase, GamePhase::Typing) {
            return;
        }

        match key.code {
            KeyCode::Esc => {
                self.screen = AppScreen::MainMenu;
                self.game = None;
            }
            KeyCode::Backspace => match game.mode {
                GameMode::Speedrun => game.speedrun_handle_backspace(),
                GameMode::Survival => {} // No backspace in survival
                GameMode::Learning => {} // No backspace in learning
            },
            KeyCode::Char(ch) => match game.mode {
                GameMode::Speedrun => game.speedrun_handle_char(ch),
                GameMode::Survival => game.survival_handle_char(ch),
                GameMode::Learning => game.learning_handle_char(ch),
            },
            _ => {}
        }

        // Check if game finished
        if let Some(ref game) = self.game
            && let GamePhase::Finished(ref result) = game.phase
        {
            let mut result = result.clone();
            if self.category_index < self.datasets.len() {
                result.category = self.datasets[self.category_index].category.clone();
            }
            let _ = self.save_game_record(&result);
            self.screen = AppScreen::Result(result);
            self.game = None;
        }
    }

    fn handle_result_key(&mut self, key: KeyEvent) {
        match key.code {
            KeyCode::Char('r') => {
                self.start_game();
            }
            KeyCode::Char('m') | KeyCode::Esc => {
                self.screen = AppScreen::MainMenu;
            }
            KeyCode::Char('q') => {
                self.screen = AppScreen::Quitting;
            }
            _ => {}
        }
    }

    fn start_game(&mut self) {
        if self.datasets.is_empty() {
            return;
        }

        let dataset = &self.datasets[self.category_index.min(self.datasets.len() - 1)];
        let mut commands = dataset.commands.clone();

        // Shuffle commands
        let mut rng = rand::rng();
        commands.shuffle(&mut rng);

        let total_rounds = DEFAULT_ROUNDS.min(commands.len());

        let mode = self.selected_mode.clone().unwrap_or(GameMode::Speedrun);
        let game = match mode {
            GameMode::Speedrun => GameState::new_speedrun(commands, total_rounds),
            GameMode::Survival => GameState::new_survival(commands, total_rounds),
            GameMode::Learning => GameState::new_learning(commands, total_rounds),
        };

        self.game = Some(game);
        self.last_countdown_tick = Some(Instant::now());
        self.screen = AppScreen::Playing;
    }

    /// Called on each frame tick to handle time-based updates
    pub fn tick(&mut self) {
        if let Some(ref mut game) = self.game
            && let GamePhase::Countdown(ref mut count) = game.phase
            && let Some(last_tick) = self.last_countdown_tick
            && last_tick.elapsed().as_secs() >= 1
        {
            if *count <= 1 {
                game.phase = GamePhase::Typing;
                game.game_start = Instant::now();
                game.round_start = Instant::now();
                self.last_countdown_tick = None;
            } else {
                *count -= 1;
                self.last_countdown_tick = Some(Instant::now());
            }
        }
    }

    fn save_game_record(&self, result: &GameResult) -> anyhow::Result<()> {
        use crate::data::records::{save_record, RecordEntry};

        let now = chrono_like_now();

        let entry = RecordEntry {
            date: now,
            mode: result.mode.label().to_lowercase(),
            category: result.category.clone(),
            total_time_ms: result.total_time.as_millis() as u64,
            accuracy: result.overall_accuracy,
            grade: result.grade,
        };

        save_record(entry)?;
        Ok(())
    }
}

/// Simple ISO 8601 date string without chrono dependency
fn chrono_like_now() -> String {
    use std::time::SystemTime;
    let duration = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap_or_default();
    let secs = duration.as_secs();
    // Simple approximation — good enough for record keeping
    let days = secs / 86400;
    let remaining = secs % 86400;
    let hours = remaining / 3600;
    let minutes = (remaining % 3600) / 60;
    let seconds = remaining % 60;

    // Calculate year/month/day from days since epoch
    let (year, month, day) = days_to_date(days);
    format!(
        "{:04}-{:02}-{:02}T{:02}:{:02}:{:02}Z",
        year, month, day, hours, minutes, seconds
    )
}

fn days_to_date(days_since_epoch: u64) -> (u64, u64, u64) {
    // Algorithm from http://howardhinnant.github.io/date_algorithms.html
    let z = days_since_epoch + 719468;
    let era = z / 146097;
    let doe = z - era * 146097;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y = yoe + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    let y = if m <= 2 { y + 1 } else { y };
    (y, m, d)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn chrono_like_now_format() {
        let now = chrono_like_now();
        // Should be ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
        assert!(now.contains('T'));
        assert!(now.ends_with('Z'));
        assert_eq!(now.len(), 20);
    }

    #[test]
    fn days_to_date_epoch() {
        let (y, m, d) = days_to_date(0);
        assert_eq!((y, m, d), (1970, 1, 1));
    }

    #[test]
    fn days_to_date_known() {
        // 2025-01-01 is day 20089
        let (y, m, d) = days_to_date(20089);
        assert_eq!(y, 2025);
        assert_eq!(m, 1);
        assert_eq!(d, 1);
    }
}
