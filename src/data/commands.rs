use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct CommandSet {
    pub category: String,
    pub display_name: String,
    pub difficulty: String,
    pub commands: Vec<Command>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Command {
    pub text: String,
    pub difficulty: u8,
    pub description: String,
}

/// Load all built-in command datasets
pub fn load_all_datasets() -> Vec<CommandSet> {
    let raw_datasets: Vec<&str> = vec![
        include_str!("../../data/git.json"),
        include_str!("../../data/git-advanced.json"),
        include_str!("../../data/docker.json"),
        include_str!("../../data/linux.json"),
        include_str!("../../data/npm.json"),
        include_str!("../../data/kubectl.json"),
    ];

    raw_datasets
        .into_iter()
        .map(|raw| serde_json::from_str::<CommandSet>(raw).expect("Failed to parse command dataset"))
        .collect()
}

/// Load a single dataset from raw JSON string (useful for testing)
pub fn load_dataset_from_str(json: &str) -> anyhow::Result<CommandSet> {
    let dataset: CommandSet = serde_json::from_str(json)?;
    Ok(dataset)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn load_all_datasets_succeeds() {
        let datasets = load_all_datasets();
        assert_eq!(datasets.len(), 6);
    }

    #[test]
    fn all_datasets_have_commands() {
        let datasets = load_all_datasets();
        for ds in &datasets {
            assert!(
                !ds.commands.is_empty(),
                "Dataset {} has no commands",
                ds.category
            );
        }
    }

    #[test]
    fn all_datasets_have_category() {
        let datasets = load_all_datasets();
        for ds in &datasets {
            assert!(!ds.category.is_empty());
            assert!(!ds.display_name.is_empty());
            assert!(!ds.difficulty.is_empty());
        }
    }

    #[test]
    fn git_dataset_has_correct_category() {
        let datasets = load_all_datasets();
        let git = datasets.iter().find(|d| d.category == "git").unwrap();
        assert_eq!(git.display_name, "Git Basics");
        assert_eq!(git.difficulty, "easy");
    }

    #[test]
    fn command_difficulty_in_range() {
        let datasets = load_all_datasets();
        for ds in &datasets {
            for cmd in &ds.commands {
                assert!(
                    (1..=3).contains(&cmd.difficulty),
                    "Command '{}' has difficulty {} outside 1-3",
                    cmd.text,
                    cmd.difficulty
                );
            }
        }
    }

    #[test]
    fn commands_have_text_and_description() {
        let datasets = load_all_datasets();
        for ds in &datasets {
            for cmd in &ds.commands {
                assert!(!cmd.text.is_empty(), "Empty command text in {}", ds.category);
                assert!(
                    !cmd.description.is_empty(),
                    "Empty description for '{}'",
                    cmd.text
                );
            }
        }
    }

    #[test]
    fn each_dataset_has_at_least_10_commands() {
        let datasets = load_all_datasets();
        for ds in &datasets {
            assert!(
                ds.commands.len() >= 10,
                "Dataset {} has only {} commands",
                ds.category,
                ds.commands.len()
            );
        }
    }

    #[test]
    fn load_dataset_from_str_valid() {
        let json = r#"{
            "category": "test",
            "display_name": "Test",
            "difficulty": "easy",
            "commands": [
                { "text": "echo hi", "difficulty": 1, "description": "say hi" }
            ]
        }"#;
        let ds = load_dataset_from_str(json).unwrap();
        assert_eq!(ds.category, "test");
        assert_eq!(ds.commands.len(), 1);
    }

    #[test]
    fn load_dataset_from_str_invalid() {
        let result = load_dataset_from_str("not json");
        assert!(result.is_err());
    }

    #[test]
    fn load_dataset_from_str_missing_field() {
        let json = r#"{ "category": "test" }"#;
        let result = load_dataset_from_str(json);
        assert!(result.is_err());
    }
}
