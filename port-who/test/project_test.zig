const std = @import("std");
const project_util = @import("project_util");

test "isDockerProcess - docker paths" {
    try std.testing.expect(project_util.isDockerProcess("/var/run/docker"));
    try std.testing.expect(project_util.isDockerProcess("docker/something"));
    try std.testing.expect(project_util.isDockerProcess("docker"));
    try std.testing.expect(project_util.isDockerProcess("/Applications/Docker.app/Contents"));
    try std.testing.expect(project_util.isDockerProcess("/Users/x/Library/Containers/com.docker.docker"));
}

test "isDockerProcess - non-docker paths" {
    try std.testing.expect(!project_util.isDockerProcess("/Users/x/projects/myapp"));
    try std.testing.expect(!project_util.isDockerProcess("/home/user/code"));
    try std.testing.expect(!project_util.isDockerProcess("/tmp/build"));
    try std.testing.expect(!project_util.isDockerProcess(""));
}

test "extractDirName - standard paths" {
    const allocator = std.testing.allocator;

    {
        const name = project_util.extractDirName(allocator, "/Users/x/projects/jagalchi-client");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("jagalchi-client", name.?);
    }

    {
        const name = project_util.extractDirName(allocator, "/home/user/code/syncingsh");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("syncingsh", name.?);
    }
}

test "extractDirName - trailing slash" {
    const allocator = std.testing.allocator;
    const name = project_util.extractDirName(allocator, "/home/user/code/my-app/");
    defer if (name) |n| allocator.free(n);
    try std.testing.expectEqualStrings("my-app", name.?);
}

test "extractDirName - root and empty" {
    const allocator = std.testing.allocator;
    {
        const name = project_util.extractDirName(allocator, "/");
        try std.testing.expect(name == null);
    }
    {
        const name = project_util.extractDirName(allocator, "");
        try std.testing.expect(name == null);
    }
}

test "extractDirName - single component" {
    const allocator = std.testing.allocator;
    const name = project_util.extractDirName(allocator, "myproject");
    defer if (name) |n| allocator.free(n);
    try std.testing.expectEqualStrings("myproject", name.?);
}

test "detectProjectNameFromPath - docker" {
    const allocator = std.testing.allocator;
    {
        const name = project_util.detectProjectNameFromPath(allocator, "/var/run/docker/containerd");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("docker", name.?);
    }
    {
        const name = project_util.detectProjectNameFromPath(allocator, "/Applications/Docker.app/Contents/Resources");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("docker", name.?);
    }
}

test "detectProjectNameFromPath - normal project" {
    const allocator = std.testing.allocator;
    {
        const name = project_util.detectProjectNameFromPath(allocator, "/Users/x/projects/syncingsh");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("syncingsh", name.?);
    }
    {
        const name = project_util.detectProjectNameFromPath(allocator, "/home/dev/jagalchi-server");
        defer if (name) |n| allocator.free(n);
        try std.testing.expectEqualStrings("jagalchi-server", name.?);
    }
}

test "detectProjectNameFromPath - deeply nested" {
    const allocator = std.testing.allocator;
    const name = project_util.detectProjectNameFromPath(allocator, "/a/b/c/d/e/my-project");
    defer if (name) |n| allocator.free(n);
    try std.testing.expectEqualStrings("my-project", name.?);
}
