const std = @import("std");

pub const Color = enum {
    reset,
    bold,
    dim,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    bold_red,
    bold_green,
    bold_yellow,
    bold_blue,
    bold_cyan,
    bold_white,

    pub fn code(self: Color) []const u8 {
        return switch (self) {
            .reset => "\x1b[0m",
            .bold => "\x1b[1m",
            .dim => "\x1b[2m",
            .red => "\x1b[31m",
            .green => "\x1b[32m",
            .yellow => "\x1b[33m",
            .blue => "\x1b[34m",
            .magenta => "\x1b[35m",
            .cyan => "\x1b[36m",
            .white => "\x1b[37m",
            .bold_red => "\x1b[1;31m",
            .bold_green => "\x1b[1;32m",
            .bold_yellow => "\x1b[1;33m",
            .bold_blue => "\x1b[1;34m",
            .bold_cyan => "\x1b[1;36m",
            .bold_white => "\x1b[1;37m",
        };
    }
};

pub const ColorConfig = struct {
    enabled: bool,

    pub fn init() ColorConfig {
        // Check NO_COLOR env variable
        const no_color = std.process.getEnvVarOwned(std.heap.page_allocator, "NO_COLOR") catch |err| switch (err) {
            error.EnvironmentVariableNotFound => return .{ .enabled = isTerminal() },
            else => return .{ .enabled = false },
        };
        defer std.heap.page_allocator.free(no_color);
        return .{ .enabled = false };
    }

    pub fn initForced(enabled: bool) ColorConfig {
        return .{ .enabled = enabled };
    }

    pub fn write(self: ColorConfig, writer: anytype, color: Color, text: []const u8) !void {
        if (self.enabled) {
            try writer.writeAll(color.code());
            try writer.writeAll(text);
            try writer.writeAll(Color.reset.code());
        } else {
            try writer.writeAll(text);
        }
    }

    pub fn writeCode(self: ColorConfig, writer: anytype, color: Color) !void {
        if (self.enabled) {
            try writer.writeAll(color.code());
        }
    }

    pub fn writeReset(self: ColorConfig, writer: anytype) !void {
        if (self.enabled) {
            try writer.writeAll(Color.reset.code());
        }
    }
};

fn isTerminal() bool {
    return std.posix.isatty(std.posix.STDOUT_FILENO);
}

// =============================================================================
// Inline tests
// =============================================================================

test "Color.code returns valid ANSI" {
    try std.testing.expectEqualStrings("\x1b[0m", Color.reset.code());
    try std.testing.expectEqualStrings("\x1b[1m", Color.bold.code());
    try std.testing.expectEqualStrings("\x1b[31m", Color.red.code());
    try std.testing.expectEqualStrings("\x1b[32m", Color.green.code());
    try std.testing.expectEqualStrings("\x1b[1;31m", Color.bold_red.code());
}

test "ColorConfig - forced disabled" {
    const cc = ColorConfig.initForced(false);
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try cc.write(stream.writer(), .red, "hello");
    try std.testing.expectEqualStrings("hello", stream.getWritten());
}

test "ColorConfig - forced enabled" {
    const cc = ColorConfig.initForced(true);
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try cc.write(stream.writer(), .red, "hello");
    try std.testing.expectEqualStrings("\x1b[31mhello\x1b[0m", stream.getWritten());
}

test "ColorConfig - writeCode and writeReset" {
    const cc = ColorConfig.initForced(true);
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try cc.writeCode(stream.writer(), .bold_cyan);
    try stream.writer().writeAll("text");
    try cc.writeReset(stream.writer());
    try std.testing.expectEqualStrings("\x1b[1;36mtext\x1b[0m", stream.getWritten());
}

test "ColorConfig - disabled writeCode is noop" {
    const cc = ColorConfig.initForced(false);
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try cc.writeCode(stream.writer(), .bold_cyan);
    try stream.writer().writeAll("text");
    try cc.writeReset(stream.writer());
    try std.testing.expectEqualStrings("text", stream.getWritten());
}
