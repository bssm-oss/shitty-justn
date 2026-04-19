/// Default number of rounds per game
pub const DEFAULT_ROUNDS: usize = 10;

/// Countdown seconds before game starts
pub const COUNTDOWN_SECS: u8 = 3;

/// Event poll timeout in milliseconds (60fps feel)
pub const POLL_TIMEOUT_MS: u64 = 16;

/// Survival mode: lives (0 = instant death on error, which is the spec)
#[allow(dead_code)]
pub const SURVIVAL_MAX_ERRORS: u32 = 0;

/// Grade thresholds: (max_avg_secs, min_accuracy) -> grade
pub fn calculate_grade(avg_secs: f64, accuracy: f64) -> char {
    match (avg_secs, accuracy) {
        (s, a) if s < 1.5 && a > 98.0 => 'S',
        (s, a) if s < 2.0 && a > 95.0 => 'A',
        (s, a) if s < 3.0 && a > 90.0 => 'B',
        (s, a) if s < 5.0 && a > 80.0 => 'C',
        _ => 'D',
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn grade_s() {
        assert_eq!(calculate_grade(1.0, 99.0), 'S');
    }

    #[test]
    fn grade_a() {
        assert_eq!(calculate_grade(1.8, 96.0), 'A');
    }

    #[test]
    fn grade_b() {
        assert_eq!(calculate_grade(2.5, 92.0), 'B');
    }

    #[test]
    fn grade_c() {
        assert_eq!(calculate_grade(4.0, 85.0), 'C');
    }

    #[test]
    fn grade_d_slow() {
        assert_eq!(calculate_grade(6.0, 99.0), 'D');
    }

    #[test]
    fn grade_d_inaccurate() {
        assert_eq!(calculate_grade(1.0, 70.0), 'D');
    }

    #[test]
    fn grade_boundary_s_fail_time() {
        // 1.5s is NOT < 1.5, so should be A (if accuracy > 95)
        assert_eq!(calculate_grade(1.5, 99.0), 'A');
    }

    #[test]
    fn grade_boundary_a_fail_accuracy() {
        // 95.0 is NOT > 95.0
        assert_eq!(calculate_grade(1.8, 95.0), 'B');
    }

    #[test]
    fn grade_d_both_bad() {
        assert_eq!(calculate_grade(10.0, 50.0), 'D');
    }

    #[test]
    fn constants_are_reasonable() {
        assert!(DEFAULT_ROUNDS > 0);
        assert!(COUNTDOWN_SECS > 0);
        assert!(POLL_TIMEOUT_MS > 0);
    }
}
