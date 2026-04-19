use std::collections::HashSet;

#[derive(Debug, Clone, PartialEq)]
pub enum CharStatus {
    Correct,
    Wrong,
    Current,
    Pending,
}

#[derive(Debug, Clone)]
pub struct TypingState {
    pub target: Vec<char>,
    pub input: Vec<char>,
    pub cursor_pos: usize,
    pub errors: HashSet<usize>,
    pub total_keystrokes: u32,
    pub correct_keystrokes: u32,
}

impl TypingState {
    pub fn new(target: &str) -> Self {
        Self {
            target: target.chars().collect(),
            input: Vec::new(),
            cursor_pos: 0,
            errors: HashSet::new(),
            total_keystrokes: 0,
            correct_keystrokes: 0,
        }
    }

    /// Handle a character input
    pub fn handle_char(&mut self, ch: char) {
        if self.cursor_pos >= self.target.len() {
            return;
        }

        self.total_keystrokes += 1;
        self.input.push(ch);

        if ch == self.target[self.cursor_pos] {
            self.correct_keystrokes += 1;
        } else {
            self.errors.insert(self.cursor_pos);
        }

        self.cursor_pos += 1;
    }

    /// Handle backspace
    pub fn handle_backspace(&mut self) {
        if self.cursor_pos == 0 {
            return;
        }

        self.cursor_pos -= 1;
        self.input.pop();
        self.errors.remove(&self.cursor_pos);
    }

    /// Check if input is complete and correct
    pub fn is_complete(&self) -> bool {
        self.input.len() == self.target.len() && self.errors.is_empty()
    }

    /// Check if all characters have been typed (may have errors)
    pub fn is_all_typed(&self) -> bool {
        self.input.len() == self.target.len()
    }

    /// Check if there are any errors
    pub fn has_errors(&self) -> bool {
        !self.errors.is_empty()
    }

    /// Calculate accuracy as a percentage
    pub fn accuracy(&self) -> f64 {
        if self.total_keystrokes == 0 {
            return 100.0;
        }
        (self.correct_keystrokes as f64 / self.total_keystrokes as f64) * 100.0
    }

    /// Get the status of a character at a given index for rendering
    pub fn char_status(&self, idx: usize) -> CharStatus {
        if idx >= self.target.len() {
            return CharStatus::Pending;
        }

        if idx == self.cursor_pos {
            return CharStatus::Current;
        }

        if idx < self.cursor_pos {
            if self.errors.contains(&idx) {
                CharStatus::Wrong
            } else {
                CharStatus::Correct
            }
        } else {
            CharStatus::Pending
        }
    }

    /// Reset for retry (keeps target, resets input)
    pub fn reset(&mut self) {
        self.input.clear();
        self.cursor_pos = 0;
        self.errors.clear();
        // Note: we keep total_keystrokes and correct_keystrokes for overall accuracy
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_initialization() {
        let state = TypingState::new("git push");
        assert_eq!(state.target, vec!['g', 'i', 't', ' ', 'p', 'u', 's', 'h']);
        assert!(state.input.is_empty());
        assert_eq!(state.cursor_pos, 0);
        assert!(state.errors.is_empty());
        assert_eq!(state.total_keystrokes, 0);
        assert_eq!(state.correct_keystrokes, 0);
    }

    #[test]
    fn handle_char_correct() {
        let mut state = TypingState::new("abc");
        state.handle_char('a');
        assert_eq!(state.input, vec!['a']);
        assert_eq!(state.cursor_pos, 1);
        assert!(state.errors.is_empty());
        assert_eq!(state.total_keystrokes, 1);
        assert_eq!(state.correct_keystrokes, 1);
    }

    #[test]
    fn handle_char_wrong() {
        let mut state = TypingState::new("abc");
        state.handle_char('x');
        assert_eq!(state.input, vec!['x']);
        assert_eq!(state.cursor_pos, 1);
        assert!(state.errors.contains(&0));
        assert_eq!(state.total_keystrokes, 1);
        assert_eq!(state.correct_keystrokes, 0);
    }

    #[test]
    fn handle_backspace_removes_char() {
        let mut state = TypingState::new("abc");
        state.handle_char('a');
        state.handle_char('x'); // wrong
        assert!(state.errors.contains(&1));
        state.handle_backspace();
        assert_eq!(state.cursor_pos, 1);
        assert_eq!(state.input, vec!['a']);
        assert!(!state.errors.contains(&1));
    }

    #[test]
    fn handle_backspace_at_start() {
        let mut state = TypingState::new("abc");
        state.handle_backspace(); // should do nothing
        assert_eq!(state.cursor_pos, 0);
        assert!(state.input.is_empty());
    }

    #[test]
    fn is_complete_true() {
        let mut state = TypingState::new("ab");
        state.handle_char('a');
        state.handle_char('b');
        assert!(state.is_complete());
    }

    #[test]
    fn is_complete_false_errors() {
        let mut state = TypingState::new("ab");
        state.handle_char('a');
        state.handle_char('x');
        assert!(!state.is_complete());
        assert!(state.is_all_typed());
    }

    #[test]
    fn is_complete_false_incomplete() {
        let mut state = TypingState::new("abc");
        state.handle_char('a');
        assert!(!state.is_complete());
        assert!(!state.is_all_typed());
    }

    #[test]
    fn accuracy_all_correct() {
        let mut state = TypingState::new("ab");
        state.handle_char('a');
        state.handle_char('b');
        assert!((state.accuracy() - 100.0).abs() < f64::EPSILON);
    }

    #[test]
    fn accuracy_half_correct() {
        let mut state = TypingState::new("ab");
        state.handle_char('a');
        state.handle_char('x');
        assert!((state.accuracy() - 50.0).abs() < f64::EPSILON);
    }

    #[test]
    fn accuracy_no_keystrokes() {
        let state = TypingState::new("abc");
        assert!((state.accuracy() - 100.0).abs() < f64::EPSILON);
    }

    #[test]
    fn char_status_correct() {
        let mut state = TypingState::new("abc");
        state.handle_char('a');
        assert_eq!(state.char_status(0), CharStatus::Correct);
    }

    #[test]
    fn char_status_wrong() {
        let mut state = TypingState::new("abc");
        state.handle_char('x');
        assert_eq!(state.char_status(0), CharStatus::Wrong);
    }

    #[test]
    fn char_status_current() {
        let mut state = TypingState::new("abc");
        state.handle_char('a');
        assert_eq!(state.char_status(1), CharStatus::Current);
    }

    #[test]
    fn char_status_pending() {
        let state = TypingState::new("abc");
        assert_eq!(state.char_status(1), CharStatus::Pending);
        assert_eq!(state.char_status(2), CharStatus::Pending);
    }

    #[test]
    fn char_status_cursor_at_start() {
        let state = TypingState::new("abc");
        assert_eq!(state.char_status(0), CharStatus::Current);
    }

    #[test]
    fn char_status_out_of_bounds() {
        let state = TypingState::new("ab");
        assert_eq!(state.char_status(5), CharStatus::Pending);
    }

    #[test]
    fn empty_target() {
        let state = TypingState::new("");
        assert!(state.target.is_empty());
        assert!(state.is_complete());
        assert!((state.accuracy() - 100.0).abs() < f64::EPSILON);
    }

    #[test]
    fn full_correct_input_sequence() {
        let mut state = TypingState::new("git");
        state.handle_char('g');
        state.handle_char('i');
        state.handle_char('t');
        assert!(state.is_complete());
        assert!((state.accuracy() - 100.0).abs() < f64::EPSILON);
        assert_eq!(state.total_keystrokes, 3);
    }

    #[test]
    fn full_wrong_input_sequence() {
        let mut state = TypingState::new("git");
        state.handle_char('x');
        state.handle_char('y');
        state.handle_char('z');
        assert!(!state.is_complete());
        assert!(state.is_all_typed());
        assert!((state.accuracy() - 0.0).abs() < f64::EPSILON);
        assert_eq!(state.errors.len(), 3);
    }

    #[test]
    fn handle_char_past_target_length() {
        let mut state = TypingState::new("ab");
        state.handle_char('a');
        state.handle_char('b');
        state.handle_char('c'); // past target
        assert_eq!(state.input.len(), 2); // should not add
        assert_eq!(state.cursor_pos, 2);
    }

    #[test]
    fn reset_clears_input_keeps_keystrokes() {
        let mut state = TypingState::new("abc");
        state.handle_char('a');
        state.handle_char('x');
        let prev_total = state.total_keystrokes;
        state.reset();
        assert!(state.input.is_empty());
        assert_eq!(state.cursor_pos, 0);
        assert!(state.errors.is_empty());
        assert_eq!(state.total_keystrokes, prev_total);
    }

    #[test]
    fn has_errors_false_initially() {
        let state = TypingState::new("abc");
        assert!(!state.has_errors());
    }

    #[test]
    fn has_errors_true_after_mistake() {
        let mut state = TypingState::new("abc");
        state.handle_char('x');
        assert!(state.has_errors());
    }

    #[test]
    fn backspace_then_retype_correct() {
        let mut state = TypingState::new("ab");
        state.handle_char('x'); // wrong
        state.handle_backspace();
        state.handle_char('a'); // correct this time
        assert_eq!(state.char_status(0), CharStatus::Correct);
        assert!(!state.errors.contains(&0));
    }

    #[test]
    fn special_characters() {
        let mut state = TypingState::new("git rebase -i HEAD~3");
        for ch in "git rebase -i HEAD~3".chars() {
            state.handle_char(ch);
        }
        assert!(state.is_complete());
    }
}
