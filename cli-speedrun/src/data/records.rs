use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct RecordEntry {
    pub date: String,
    pub mode: String,
    pub category: String,
    pub total_time_ms: u64,
    pub accuracy: f64,
    pub grade: char,
}

/// Get the path to the history file
pub fn history_file_path() -> PathBuf {
    let data_dir = dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("cli-speedrun");
    data_dir.join("history.json")
}

/// Load records from a specific path
pub fn load_records_from(path: &std::path::Path) -> Result<Vec<RecordEntry>> {
    if !path.exists() {
        return Ok(Vec::new());
    }
    let content = fs::read_to_string(path)?;
    if content.trim().is_empty() {
        return Ok(Vec::new());
    }
    let records: Vec<RecordEntry> = serde_json::from_str(&content)?;
    Ok(records)
}

/// Save records to a specific path
pub fn save_records_to(path: &std::path::Path, records: &[RecordEntry]) -> Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    let json = serde_json::to_string_pretty(records)?;
    fs::write(path, json)?;
    Ok(())
}

/// Load records from the default history file
pub fn load_records() -> Result<Vec<RecordEntry>> {
    load_records_from(&history_file_path())
}

/// Save a record to the default history file
pub fn save_record(entry: RecordEntry) -> Result<()> {
    let path = history_file_path();
    let mut records = load_records_from(&path)?;
    records.push(entry);
    save_records_to(&path, &records)?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::NamedTempFile;

    fn sample_entry() -> RecordEntry {
        RecordEntry {
            date: "2025-01-15T10:30:00Z".to_string(),
            mode: "speedrun".to_string(),
            category: "git".to_string(),
            total_time_ms: 21300,
            accuracy: 92.0,
            grade: 'A',
        }
    }

    #[test]
    fn serialize_deserialize_roundtrip() {
        let entry = sample_entry();
        let json = serde_json::to_string(&entry).unwrap();
        let parsed: RecordEntry = serde_json::from_str(&json).unwrap();
        assert_eq!(entry, parsed);
    }

    #[test]
    fn load_from_nonexistent_file() {
        let path = PathBuf::from("/tmp/cli-speedrun-test-nonexistent-12345.json");
        let records = load_records_from(&path).unwrap();
        assert!(records.is_empty());
    }

    #[test]
    fn load_from_empty_file() {
        let mut tmp = NamedTempFile::new().unwrap();
        write!(tmp, "").unwrap();
        let records = load_records_from(tmp.path()).unwrap();
        assert!(records.is_empty());
    }

    #[test]
    fn save_and_load() {
        let tmp = NamedTempFile::new().unwrap();
        let path = tmp.path().to_path_buf();

        let entries = vec![sample_entry()];
        save_records_to(&path, &entries).unwrap();

        let loaded = load_records_from(&path).unwrap();
        assert_eq!(loaded.len(), 1);
        assert_eq!(loaded[0].category, "git");
        assert_eq!(loaded[0].grade, 'A');
    }

    #[test]
    fn save_multiple_and_load() {
        let tmp = NamedTempFile::new().unwrap();
        let path = tmp.path().to_path_buf();

        let entry1 = sample_entry();
        let mut entry2 = sample_entry();
        entry2.category = "docker".to_string();
        entry2.grade = 'S';

        let entries = vec![entry1.clone(), entry2.clone()];
        save_records_to(&path, &entries).unwrap();

        let loaded = load_records_from(&path).unwrap();
        assert_eq!(loaded.len(), 2);
        assert_eq!(loaded[0].category, "git");
        assert_eq!(loaded[1].category, "docker");
    }

    #[test]
    fn load_invalid_json() {
        let mut tmp = NamedTempFile::new().unwrap();
        write!(tmp, "not valid json").unwrap();
        let result = load_records_from(tmp.path());
        assert!(result.is_err());
    }

    #[test]
    fn history_file_path_exists() {
        let path = history_file_path();
        assert!(path.to_str().unwrap().contains("cli-speedrun"));
        assert!(path.to_str().unwrap().contains("history.json"));
    }

    #[test]
    fn record_entry_fields() {
        let entry = sample_entry();
        assert_eq!(entry.date, "2025-01-15T10:30:00Z");
        assert_eq!(entry.mode, "speedrun");
        assert_eq!(entry.total_time_ms, 21300);
        assert!((entry.accuracy - 92.0).abs() < f64::EPSILON);
    }
}
