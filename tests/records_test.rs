use cli_speedrun::data::records::{load_records_from, save_records_to, RecordEntry};
use std::path::PathBuf;
use tempfile::NamedTempFile;

fn sample() -> RecordEntry {
    RecordEntry {
        date: "2025-06-01T12:00:00Z".to_string(),
        mode: "speedrun".to_string(),
        category: "git".to_string(),
        total_time_ms: 15000,
        accuracy: 95.5,
        grade: 'A',
    }
}

#[test]
fn roundtrip_serialize() {
    let entry = sample();
    let json = serde_json::to_string(&entry).unwrap();
    let parsed: RecordEntry = serde_json::from_str(&json).unwrap();
    assert_eq!(entry, parsed);
}

#[test]
fn load_nonexistent() {
    let path = PathBuf::from("/tmp/cli-speedrun-records-test-does-not-exist.json");
    let records = load_records_from(&path).unwrap();
    assert!(records.is_empty());
}

#[test]
fn save_and_load_one() {
    let tmp = NamedTempFile::new().unwrap();
    let path = tmp.path().to_path_buf();
    save_records_to(&path, &[sample()]).unwrap();
    let loaded = load_records_from(&path).unwrap();
    assert_eq!(loaded.len(), 1);
    assert_eq!(loaded[0].grade, 'A');
}

#[test]
fn save_and_load_multiple() {
    let tmp = NamedTempFile::new().unwrap();
    let path = tmp.path().to_path_buf();

    let e1 = sample();
    let mut e2 = sample();
    e2.category = "docker".to_string();
    e2.grade = 'S';

    save_records_to(&path, &[e1, e2]).unwrap();
    let loaded = load_records_from(&path).unwrap();
    assert_eq!(loaded.len(), 2);
    assert_eq!(loaded[1].grade, 'S');
}

#[test]
fn load_empty_file() {
    let tmp = NamedTempFile::new().unwrap();
    // File exists but is empty
    let records = load_records_from(tmp.path()).unwrap();
    assert!(records.is_empty());
}
