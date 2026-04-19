use cli_speedrun::data::commands::{load_all_datasets, load_dataset_from_str};

#[test]
fn load_all_six_datasets() {
    let ds = load_all_datasets();
    assert_eq!(ds.len(), 6);
}

#[test]
fn categories_are_unique() {
    let ds = load_all_datasets();
    let cats: Vec<&str> = ds.iter().map(|d| d.category.as_str()).collect();
    let mut unique = cats.clone();
    unique.sort();
    unique.dedup();
    assert_eq!(cats.len(), unique.len());
}

#[test]
fn all_have_at_least_10_commands() {
    for ds in load_all_datasets() {
        assert!(
            ds.commands.len() >= 10,
            "{} has {} commands",
            ds.category,
            ds.commands.len()
        );
    }
}

#[test]
fn difficulty_in_range() {
    for ds in load_all_datasets() {
        for cmd in &ds.commands {
            assert!(
                (1..=3).contains(&cmd.difficulty),
                "'{}' difficulty {} not in 1..3",
                cmd.text,
                cmd.difficulty
            );
        }
    }
}

#[test]
fn no_empty_text() {
    for ds in load_all_datasets() {
        for cmd in &ds.commands {
            assert!(!cmd.text.is_empty());
        }
    }
}

#[test]
fn known_categories_present() {
    let ds = load_all_datasets();
    let cats: Vec<&str> = ds.iter().map(|d| d.category.as_str()).collect();
    assert!(cats.contains(&"git"));
    assert!(cats.contains(&"git-advanced"));
    assert!(cats.contains(&"docker"));
    assert!(cats.contains(&"linux"));
    assert!(cats.contains(&"npm"));
    assert!(cats.contains(&"kubectl"));
}

#[test]
fn from_str_valid_json() {
    let json = r#"{
        "category": "test",
        "display_name": "Test Set",
        "difficulty": "easy",
        "commands": [{ "text": "echo hello", "difficulty": 1, "description": "Hello" }]
    }"#;
    let ds = load_dataset_from_str(json).unwrap();
    assert_eq!(ds.category, "test");
    assert_eq!(ds.commands.len(), 1);
}

#[test]
fn from_str_invalid_json() {
    assert!(load_dataset_from_str("{{invalid").is_err());
}
