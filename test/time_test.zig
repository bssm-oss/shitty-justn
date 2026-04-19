const std = @import("std");
const time_util = @import("time_util");

test "formatUptime - zero seconds" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("0s", time_util.formatUptime(&buf, 0));
}

test "formatUptime - seconds only" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1s", time_util.formatUptime(&buf, 1));
    try std.testing.expectEqualStrings("23s", time_util.formatUptime(&buf, 23));
    try std.testing.expectEqualStrings("59s", time_util.formatUptime(&buf, 59));
}

test "formatUptime - exact minutes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1m", time_util.formatUptime(&buf, 60));
    try std.testing.expectEqualStrings("47m", time_util.formatUptime(&buf, 47 * 60));
}

test "formatUptime - minutes and seconds" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("5m 30s", time_util.formatUptime(&buf, 5 * 60 + 30));
    try std.testing.expectEqualStrings("1m 1s", time_util.formatUptime(&buf, 61));
}

test "formatUptime - exact hours" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1h", time_util.formatUptime(&buf, 3600));
    try std.testing.expectEqualStrings("5h", time_util.formatUptime(&buf, 5 * 3600));
}

test "formatUptime - hours and minutes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("2h 13m", time_util.formatUptime(&buf, 2 * 3600 + 13 * 60));
    try std.testing.expectEqualStrings("1h 1m", time_util.formatUptime(&buf, 3600 + 60));
}

test "formatUptime - exact days" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1d", time_util.formatUptime(&buf, 86400));
    try std.testing.expectEqualStrings("3d", time_util.formatUptime(&buf, 3 * 86400));
    try std.testing.expectEqualStrings("7d", time_util.formatUptime(&buf, 7 * 86400));
}

test "formatUptime - days and hours" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1d 5h", time_util.formatUptime(&buf, 86400 + 5 * 3600));
    try std.testing.expectEqualStrings("30d 12h", time_util.formatUptime(&buf, 30 * 86400 + 12 * 3600));
}

test "formatUptime - negative value" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("unknown", time_util.formatUptime(&buf, -1));
    try std.testing.expectEqualStrings("unknown", time_util.formatUptime(&buf, -100));
}

test "formatMemory - bytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("0B", time_util.formatMemory(&buf, 0));
    try std.testing.expectEqualStrings("512B", time_util.formatMemory(&buf, 512));
    try std.testing.expectEqualStrings("1023B", time_util.formatMemory(&buf, 1023));
}

test "formatMemory - kilobytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1KB", time_util.formatMemory(&buf, 1024));
    try std.testing.expectEqualStrings("10KB", time_util.formatMemory(&buf, 10 * 1024));
    try std.testing.expectEqualStrings("512KB", time_util.formatMemory(&buf, 512 * 1024));
}

test "formatMemory - megabytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1MB", time_util.formatMemory(&buf, 1024 * 1024));
    try std.testing.expectEqualStrings("312MB", time_util.formatMemory(&buf, 312 * 1024 * 1024));
    try std.testing.expectEqualStrings("512MB", time_util.formatMemory(&buf, 512 * 1024 * 1024));
}

test "formatMemory - gigabytes" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1.0GB", time_util.formatMemory(&buf, 1024 * 1024 * 1024));
    try std.testing.expectEqualStrings("1.5GB", time_util.formatMemory(&buf, 1536 * 1024 * 1024));
    try std.testing.expectEqualStrings("2.0GB", time_util.formatMemory(&buf, 2048 * 1024 * 1024));
}

test "formatUptime - boundary values" {
    var buf: [64]u8 = undefined;
    try std.testing.expectEqualStrings("1h", time_util.formatUptime(&buf, 3600));
    // 1 hour 0 min 30 sec → shows "1h" (minutes check: 0, so no minutes)
    try std.testing.expectEqualStrings("1h", time_util.formatUptime(&buf, 3630));
}
