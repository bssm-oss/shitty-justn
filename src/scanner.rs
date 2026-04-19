use std::fs;
use std::path::Path;
use crate::models::{Project, ProjectType};

pub fn find_projects(root: &Path, max_depth: u8) -> Vec<Project> {
    let mut projects = Vec::new();
    scan_dir(root, 0, max_depth, &mut projects);
    projects
}

fn scan_dir(dir: &Path, depth: u8, max_depth: u8, projects: &mut Vec<Project>) {
    if depth > max_depth {
        return;
    }

    let entries = match fs::read_dir(dir) {
        Ok(e) => e,
        Err(_) => return,
    };

    let mut has_node = false;
    let mut has_python = false;
    let mut has_java = false;
    let mut has_go = false;

    let ignored = ["node_modules", ".git", ".venv", "venv", ".cache", "dist", "build", "target", "__pycache__"];

    for entry in entries.flatten() {
        let path = entry.path();
        let name = entry.file_name().to_string_lossy().into_owned();

        if path.is_dir() {
            if !ignored.contains(&name.as_str()) {
                scan_dir(&path, depth + 1, max_depth, projects);
            }
        } else {
            match name.as_str() {
                "package.json" => has_node = true,
                "requirements.txt" => has_python = true,
                "pom.xml" => has_java = true,
                "go.mod" => has_go = true,
                _ => {}
            }
        }
    }

    if has_node {
        projects.push(Project {
            path: dir.to_path_buf(),
            project_type: ProjectType::Node,
        });
    }
    if has_python {
        projects.push(Project {
            path: dir.to_path_buf(),
            project_type: ProjectType::Python,
        });
    }
    if has_java {
        projects.push(Project {
            path: dir.to_path_buf(),
            project_type: ProjectType::Java,
        });
    }
    if has_go {
        projects.push(Project {
            path: dir.to_path_buf(),
            project_type: ProjectType::Go,
        });
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::TempDir;
    use std::fs;

    #[test]
    fn finds_node_project() {
        let tmp = TempDir::new().unwrap();
        fs::write(tmp.path().join("package.json"), "{}").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 1);
        assert_eq!(projects[0].project_type, ProjectType::Node);
    }

    #[test]
    fn finds_python_project() {
        let tmp = TempDir::new().unwrap();
        fs::write(tmp.path().join("requirements.txt"), "").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 1);
        assert_eq!(projects[0].project_type, ProjectType::Python);
    }

    #[test]
    fn finds_java_project() {
        let tmp = TempDir::new().unwrap();
        fs::write(tmp.path().join("pom.xml"), "").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 1);
        assert_eq!(projects[0].project_type, ProjectType::Java);
    }

    #[test]
    fn finds_go_project() {
        let tmp = TempDir::new().unwrap();
        fs::write(tmp.path().join("go.mod"), "").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 1);
        assert_eq!(projects[0].project_type, ProjectType::Go);
    }

    #[test]
    fn finds_multiple_types_in_same_dir() {
        let tmp = TempDir::new().unwrap();
        fs::write(tmp.path().join("package.json"), "{}").unwrap();
        fs::write(tmp.path().join("requirements.txt"), "").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 2);
        let types: Vec<_> = projects.iter().map(|p| &p.project_type).collect();
        assert!(types.contains(&&ProjectType::Node));
        assert!(types.contains(&&ProjectType::Python));
    }

    #[test]
    fn ignores_node_modules() {
        let tmp = TempDir::new().unwrap();
        let nm = tmp.path().join("node_modules").join("some-pkg");
        fs::create_dir_all(&nm).unwrap();
        fs::write(nm.join("package.json"), "{}").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 0);
    }

    #[test]
    fn respects_max_depth() {
        let tmp = TempDir::new().unwrap();
        let deep = tmp.path().join("a").join("b").join("c");
        fs::create_dir_all(&deep).unwrap();
        fs::write(deep.join("package.json"), "{}").unwrap();

        // depth 0: 루트만 (깊이 1까지)
        let projects = find_projects(tmp.path(), 1);
        assert_eq!(projects.len(), 0);

        // depth 4: 충분히 깊이 탐색
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 1);
    }

    #[test]
    fn empty_directory() {
        let tmp = TempDir::new().unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 0);
    }

    #[test]
    fn nested_project_found() {
        let tmp = TempDir::new().unwrap();
        let sub = tmp.path().join("subproject");
        fs::create_dir(&sub).unwrap();
        fs::write(sub.join("go.mod"), "").unwrap();
        let projects = find_projects(tmp.path(), 4);
        assert_eq!(projects.len(), 1);
        assert_eq!(projects[0].path, sub);
    }
}
