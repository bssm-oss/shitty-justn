const std = @import("std");

/// Project marker files and their types
const project_markers = [_][]const u8{
    "package.json",
    "Cargo.toml",
    "go.mod",
    "build.zig.zon",
    "pyproject.toml",
    "pom.xml",
    "build.gradle",
    "Gemfile",
    "mix.exs",
    "deno.json",
    "composer.json",
};

/// Detect project name from a working directory path.
/// Checks for project marker files in the directory and its parents.
/// Returns the directory name containing the marker.
pub fn detectProjectName(allocator: std.mem.Allocator, cwd: []const u8) ?[]const u8 {
    // Special cases
    if (isDockerProcess(cwd)) {
        return allocator.dupe(u8, "docker") catch null;
    }

    // Check the cwd itself and parent directories
    var dir_path = cwd;
    var depth: u32 = 0;
    const max_depth: u32 = 5; // Don't go too far up

    while (depth < max_depth) : (depth += 1) {
        for (project_markers) |marker| {
            // Try to build the full path and check existence
            const full_path = std.fs.path.join(allocator, &.{ dir_path, marker }) catch continue;
            defer allocator.free(full_path);

            // Check if the file exists
            if (std.fs.cwd().access(full_path, .{})) |_| {
                // Found a marker — extract directory name
                return extractDirName(allocator, dir_path);
            } else |_| {
                continue;
            }
        }

        // Go to parent directory
        if (std.fs.path.dirname(dir_path)) |parent| {
            if (std.mem.eql(u8, parent, dir_path)) break; // reached root
            dir_path = parent;
        } else {
            break;
        }
    }

    return null;
}

/// Detect project name from path string only (no filesystem access).
/// Used for testing. Returns the last path component.
pub fn detectProjectNameFromPath(allocator: std.mem.Allocator, cwd: []const u8) ?[]const u8 {
    if (isDockerProcess(cwd)) {
        return allocator.dupe(u8, "docker") catch null;
    }
    return extractDirName(allocator, cwd);
}

/// Check if a path looks like a Docker process
pub fn isDockerProcess(path: []const u8) bool {
    if (std.mem.indexOf(u8, path, "/docker") != null) return true;
    if (std.mem.indexOf(u8, path, "docker/") != null) return true;
    if (std.mem.eql(u8, path, "docker")) return true;
    // Docker Desktop paths
    if (std.mem.indexOf(u8, path, "com.docker") != null) return true;
    if (std.mem.indexOf(u8, path, "Docker.app") != null) return true;
    return false;
}

/// Extract directory name (last component) from a path
pub fn extractDirName(allocator: std.mem.Allocator, path: []const u8) ?[]const u8 {
    const trimmed = std.mem.trimRight(u8, path, "/");
    if (trimmed.len == 0) return null;

    const base = std.fs.path.basename(trimmed);
    if (base.len == 0) return null;

    return allocator.dupe(u8, base) catch null;
}

// =============================================================================
// Inline tests
// =============================================================================

test "isDockerProcess" {
    try std.testing.expect(isDockerProcess("/var/run/docker"));
    try std.testing.expect(isDockerProcess("docker/something"));
    try std.testing.expect(isDockerProcess("docker"));
    try std.testing.expect(isDockerProcess("/Applications/Docker.app/Contents"));
    try std.testing.expect(isDockerProcess("/Users/x/Library/Containers/com.docker.docker"));
    try std.testing.expect(!isDockerProcess("/Users/x/projects/myapp"));
    try std.testing.expect(!isDockerProcess("/home/user/code"));
}

test "extractDirName - basic paths" {
    const allocator = std.testing.allocator;

    {
        const name = extractDirName(allocator, "/Users/x/projects/jagalchi-client");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("jagalchi-client", name.?);
    }

    {
        const name = extractDirName(allocator, "/home/user/code/my-app/");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("my-app", name.?);
    }

    {
        const name = extractDirName(allocator, "/");
        // root path: basename of "/" is ""
        try std.testing.expect(name == null);
    }
}

test "extractDirName - empty" {
    const allocator = std.testing.allocator;
    const name = extractDirName(allocator, "");
    try std.testing.expect(name == null);
}

test "detectProjectNameFromPath - docker" {
    const allocator = std.testing.allocator;
    const name = detectProjectNameFromPath(allocator, "/var/run/docker/something");
    defer if (name) |n| allocator.free(n);
    try std.testing.expectEqualStrings("docker", name.?);
}

test "detectProjectNameFromPath - normal path" {
    const allocator = std.testing.allocator;
    const name = detectProjectNameFromPath(allocator, "/Users/x/projects/syncingsh");
    defer if (name) |n| allocator.free(n);
    try std.testing.expectEqualStrings("syncingsh", name.?);
}
