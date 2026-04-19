const std = @import("std");

/// Format elapsed seconds into human-readable uptime string.
/// Examples: "3d", "2h 13m", "47m", "23s"
pub fn formatUptime(buf: []u8, elapsed_secs: i64) []const u8 {
    if (elapsed_secs < 0) {
        return copyToBuf(buf, "unknown");
    }

    const secs: u64 = @intCast(elapsed_secs);
    const days = secs / 86400;
    const hours = (secs % 86400) / 3600;
    const minutes = (secs % 3600) / 60;
    const seconds = secs % 60;

    var stream = std.io.fixedBufferStream(buf);
    const writer = stream.writer();

    if (days > 0) {
        if (hours > 0) {
            writer.print("{d}d {d}h", .{ days, hours }) catch return copyToBuf(buf, "???");
        } else {
            writer.print("{d}d", .{days}) catch return copyToBuf(buf, "???");
        }
    } else if (hours > 0) {
        if (minutes > 0) {
            writer.print("{d}h {d}m", .{ hours, minutes }) catch return copyToBuf(buf, "???");
        } else {
            writer.print("{d}h", .{hours}) catch return copyToBuf(buf, "???");
        }
    } else if (minutes > 0) {
        if (seconds > 0) {
            writer.print("{d}m {d}s", .{ minutes, seconds }) catch return copyToBuf(buf, "???");
        } else {
            writer.print("{d}m", .{minutes}) catch return copyToBuf(buf, "???");
        }
    } else {
        writer.print("{d}s", .{seconds}) catch return copyToBuf(buf, "???");
    }

    return buf[0..stream.pos];
}

/// Calculate uptime from start_time epoch seconds to now
pub fn calculateUptime(start_time: i64) i64 {
    const now = std.time.timestamp();
    return now - start_time;
}

/// Format memory in bytes to human-readable string
pub fn formatMemory(buf: []u8, bytes: u64) []const u8 {
    var stream = std.io.fixedBufferStream(buf);
    const writer = stream.writer();

    if (bytes >= 1024 * 1024 * 1024) {
        const gb = @as(f64, @floatFromInt(bytes)) / (1024.0 * 1024.0 * 1024.0);
        writer.print("{d:.1}GB", .{gb}) catch return copyToBuf(buf, "???");
    } else if (bytes >= 1024 * 1024) {
        const mb = @as(f64, @floatFromInt(bytes)) / (1024.0 * 1024.0);
        writer.print("{d:.0}MB", .{mb}) catch return copyToBuf(buf, "???");
    } else if (bytes >= 1024) {
        const kb = @as(f64, @floatFromInt(bytes)) / 1024.0;
        writer.print("{d:.0}KB", .{kb}) catch return copyToBuf(buf, "???");
    } else {
        writer.print("{d}B", .{bytes}) catch return copyToBuf(buf, "???");
    }

    return buf[0..stream.pos];
}

fn copyToBuf(buf: []u8, src: []const u8) []const u8 {
    const len = @min(src.len, buf.len);
    @memcpy(buf[0..len], src[0..len]);
    return buf[0..len];
}

// =============================================================================
// Inline tests
// =============================================================================

test "formatUptime - seconds" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("0s", formatUptime(&buf, 0));
    try std.testing.expectEqualStrings("23s", formatUptime(&buf, 23));
    try std.testing.expectEqualStrings("59s", formatUptime(&buf, 59));
}

test "formatUptime - minutes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1m", formatUptime(&buf, 60));
    try std.testing.expectEqualStrings("47m", formatUptime(&buf, 47 * 60));
    try std.testing.expectEqualStrings("5m 30s", formatUptime(&buf, 5 * 60 + 30));
}

test "formatUptime - hours" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1h", formatUptime(&buf, 3600));
    try std.testing.expectEqualStrings("2h 13m", formatUptime(&buf, 2 * 3600 + 13 * 60));
    try std.testing.expectEqualStrings("5h", formatUptime(&buf, 5 * 3600));
}

test "formatUptime - days" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("3d", formatUptime(&buf, 3 * 86400));
    try std.testing.expectEqualStrings("1d 5h", formatUptime(&buf, 86400 + 5 * 3600));
    try std.testing.expectEqualStrings("7d", formatUptime(&buf, 7 * 86400));
}

test "formatUptime - negative" {
    var buf: [64]u8 = undefined;
    const result = formatUptime(&buf, -1);
    try std.testing.expectEqualStrings("unknown", result);
}

test "formatMemory - bytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("512B", formatMemory(&buf, 512));
    try std.testing.expectEqualStrings("0B", formatMemory(&buf, 0));
}

test "formatMemory - kilobytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("10KB", formatMemory(&buf, 10 * 1024));
}

test "formatMemory - megabytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("312MB", formatMemory(&buf, 312 * 1024 * 1024));
}

test "formatMemory - gigabytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1.5GB", formatMemory(&buf, 1536 * 1024 * 1024));
}
