use cli_speedrun::game::typing::{CharStatus, TypingState};

#[test]
fn typing_state_new() {
    let ts = TypingState::new("hello");
    assert_eq!(ts.target.len(), 5);
    assert!(ts.input.is_empty());
    assert_eq!(ts.cursor_pos, 0);
}

#[test]
fn correct_input_full() {
    let mut ts = TypingState::new("abc");
    ts.handle_char('a');
    ts.handle_char('b');
    ts.handle_char('c');
    assert!(ts.is_complete());
    assert!((ts.accuracy() - 100.0).abs() < f64::EPSILON);
}

#[test]
fn wrong_input_full() {
    let mut ts = TypingState::new("abc");
    ts.handle_char('x');
    ts.handle_char('y');
    ts.handle_char('z');
    assert!(!ts.is_complete());
    assert!(ts.is_all_typed());
    assert_eq!(ts.errors.len(), 3);
}

#[test]
fn backspace_corrects_error() {
    let mut ts = TypingState::new("ab");
    ts.handle_char('x'); // wrong
    assert!(ts.errors.contains(&0));
    ts.handle_backspace();
    assert!(!ts.errors.contains(&0));
    ts.handle_char('a'); // correct now
    assert!(!ts.errors.contains(&0));
    assert_eq!(ts.char_status(0), CharStatus::Correct);
}

#[test]
fn char_status_all_positions() {
    let mut ts = TypingState::new("abcd");
    ts.handle_char('a'); // correct at 0
    ts.handle_char('x'); // wrong at 1

    assert_eq!(ts.char_status(0), CharStatus::Correct);
    assert_eq!(ts.char_status(1), CharStatus::Wrong);
    assert_eq!(ts.char_status(2), CharStatus::Current);
    assert_eq!(ts.char_status(3), CharStatus::Pending);
}

#[test]
fn accuracy_with_backspace() {
    let mut ts = TypingState::new("ab");
    ts.handle_char('x'); // wrong: total=1, correct=0
    ts.handle_backspace(); // does not change keystroke counts
    ts.handle_char('a'); // correct: total=2, correct=1
    ts.handle_char('b'); // correct: total=3, correct=2
    assert!((ts.accuracy() - (2.0 / 3.0 * 100.0)).abs() < 0.01);
}

#[test]
fn special_characters_typing() {
    let cmd = "docker run -d -p 8080:80 nginx";
    let mut ts = TypingState::new(cmd);
    for ch in cmd.chars() {
        ts.handle_char(ch);
    }
    assert!(ts.is_complete());
}

#[test]
fn empty_target_is_complete() {
    let ts = TypingState::new("");
    assert!(ts.is_complete());
}

#[test]
fn cannot_type_past_target() {
    let mut ts = TypingState::new("a");
    ts.handle_char('a');
    ts.handle_char('b'); // should be ignored
    assert_eq!(ts.input.len(), 1);
    assert_eq!(ts.cursor_pos, 1);
}

#[test]
fn reset_state() {
    let mut ts = TypingState::new("abc");
    ts.handle_char('a');
    ts.handle_char('x');
    let total = ts.total_keystrokes;
    ts.reset();
    assert!(ts.input.is_empty());
    assert_eq!(ts.cursor_pos, 0);
    assert!(ts.errors.is_empty());
    assert_eq!(ts.total_keystrokes, total); // preserved
}
