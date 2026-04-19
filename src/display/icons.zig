const std = @import("std");

/// Get emoji icon for a process name
pub fn getProcessIcon(process_name: []const u8) []const u8 {
    // Lowercase comparison via manual check
    const name = process_name;

    // Node/JS ecosystem
    if (containsAny(name, &.{ "node", "next", "vite", "nuxt", "deno", "bun", "tsx", "npx", "esbuild", "webpack", "rollup", "turbo" }))
        return "\xe2\x9a\xa1"; // ⚡

    // Database
    if (containsAny(name, &.{ "postgres", "mysql", "mysqld", "redis", "redis-server", "mongo", "mongod", "sqlite", "mariadb", "cockroach" }))
        return "\xf0\x9f\x97\x84\xef\xb8\x8f"; // 🗄️

    // Docker
    if (containsAny(name, &.{ "docker", "com.docker", "containerd", "dockerd" }))
        return "\xf0\x9f\x90\xb3"; // 🐳

    // Python
    if (containsAny(name, &.{ "python", "python3", "flask", "django", "uvicorn", "gunicorn", "celery", "fastapi" }))
        return "\xf0\x9f\x90\x8d"; // 🐍

    // Java
    if (containsAny(name, &.{ "java", "spring", "gradle", "mvn", "tomcat", "jetty", "kotlin" }))
        return "\xe2\x98\x95"; // ☕

    // Web servers
    if (containsAny(name, &.{ "nginx", "apache", "httpd", "caddy", "haproxy", "traefik" }))
        return "\xf0\x9f\x8c\x90"; // 🌐

    // Go
    if (containsAny(name, &.{ "go", "gopls" }))
        return "\xf0\x9f\x94\xb7"; // 🔷

    // Rust
    if (containsAny(name, &.{ "cargo", "rustc" }))
        return "\xf0\x9f\xa6\x80"; // 🦀

    // Ruby
    if (containsAny(name, &.{ "ruby", "rails", "puma", "sidekiq", "unicorn" }))
        return "\xf0\x9f\x92\x8e"; // 💎

    // PHP
    if (containsAny(name, &.{ "php", "php-fpm", "artisan", "laravel" }))
        return "\xf0\x9f\x90\x98"; // 🐘

    return "\xe2\x9d\x93"; // ❓
}

/// Get color for uptime value
/// green < 1h, yellow < 1d, red >= 1d
pub fn getUptimeColor(elapsed_secs: i64) enum { green, yellow, red } {
    if (elapsed_secs < 0) return .yellow;
    if (elapsed_secs < 3600) return .green; // < 1 hour
    if (elapsed_secs < 86400) return .yellow; // < 1 day
    return .red; // >= 1 day
}

fn containsAny(name: []const u8, needles: []const []const u8) bool {
    for (needles) |needle| {
        if (eqlCaseInsensitive(name, needle)) return true;
        // Also check if name contains the needle as a substring
        if (containsCaseInsensitive(name, needle)) return true;
    }
    return false;
}

fn eqlCaseInsensitive(a: []const u8, b: []const u8) bool {
    if (a.len != b.len) return false;
    for (a, b) |ac, bc| {
        if (toLower(ac) != toLower(bc)) return false;
    }
    return true;
}

fn containsCaseInsensitive(haystack: []const u8, needle: []const u8) bool {
    if (needle.len > haystack.len) return false;
    if (needle.len == 0) return true;
    var i: usize = 0;
    while (i + needle.len <= haystack.len) : (i += 1) {
        var matched = true;
        for (0..needle.len) |j| {
            if (toLower(haystack[i + j]) != toLower(needle[j])) {
                matched = false;
                break;
            }
        }
        if (matched) return true;
    }
    return false;
}

fn toLower(c: u8) u8 {
    if (c >= 'A' and c <= 'Z') return c + 32;
    return c;
}

// =============================================================================
// Inline tests
// =============================================================================

test "getProcessIcon - node variants" {
    try std.testing.expectEqualStrings("\xe2\x9a\xa1", getProcessIcon("node"));
    try std.testing.expectEqualStrings("\xe2\x9a\xa1", getProcessIcon("next"));
    try std.testing.expectEqualStrings("\xe2\x9a\xa1", getProcessIcon("vite"));
}

test "getProcessIcon - database" {
    try std.testing.expectEqualStrings("\xf0\x9f\x97\x84\xef\xb8\x8f", getProcessIcon("postgres"));
    try std.testing.expectEqualStrings("\xf0\x9f\x97\x84\xef\xb8\x8f", getProcessIcon("redis-server"));
}

test "getProcessIcon - docker" {
    try std.testing.expectEqualStrings("\xf0\x9f\x90\xb3", getProcessIcon("docker"));
    try std.testing.expectEqualStrings("\xf0\x9f\x90\xb3", getProcessIcon("com.docker"));
}

test "getProcessIcon - python" {
    try std.testing.expectEqualStrings("\xf0\x9f\x90\x8d", getProcessIcon("python3"));
    try std.testing.expectEqualStrings("\xf0\x9f\x90\x8d", getProcessIcon("flask"));
}

test "getProcessIcon - java" {
    try std.testing.expectEqualStrings("\xe2\x98\x95", getProcessIcon("java"));
}

test "getProcessIcon - web server" {
    try std.testing.expectEqualStrings("\xf0\x9f\x8c\x90", getProcessIcon("nginx"));
}

test "getProcessIcon - unknown" {
    try std.testing.expectEqualStrings("\xe2\x9d\x93", getProcessIcon("some-unknown-process"));
}

test "getUptimeColor" {
    try std.testing.expectEqual(@as(@TypeOf(.green), .green), getUptimeColor(30)); // 30 secs
    try std.testing.expectEqual(@as(@TypeOf(.green), .green), getUptimeColor(3599)); // just under 1h
    try std.testing.expectEqual(@as(@TypeOf(.yellow), .yellow), getUptimeColor(3600)); // exactly 1h
    try std.testing.expectEqual(@as(@TypeOf(.yellow), .yellow), getUptimeColor(86399)); // just under 1d
    try std.testing.expectEqual(@as(@TypeOf(.red), .red), getUptimeColor(86400)); // exactly 1d
    try std.testing.expectEqual(@as(@TypeOf(.red), .red), getUptimeColor(200000)); // > 1d
}
