const std = @import("std");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;
const color_mod = @import("color");
const ColorConfig = color_mod.ColorConfig;
const Color = color_mod.Color;
const time_util = @import("time_util");

/// Print detailed information for a single port
pub fn printDetail(info_item: *const PortInfo, cc: ColorConfig) !void {
    var out_buf: [8192]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    try printDetailTo(&out.interface, info_item, cc);
    try out.interface.flush();
}

/// Print detail to any writer
pub fn printDetailTo(writer: anytype, info_item: *const PortInfo, cc: ColorConfig) !void {
    try writer.writeByte('\n');

    // Header: :PORT — process_name
    try cc.writeCode(writer, .bold_white);
    try writer.print(":{d}", .{info_item.port});
    try cc.writeReset(writer);
    try writer.writeAll(" \xe2\x80\x94 "); // em dash
    if (info_item.is_identified) {
        try cc.write(writer, .bold_green, info_item.process_name);
    } else {
        try cc.write(writer, .bold_red, "???");
    }
    try writer.writeByte('\n');

    // PID
    try cc.write(writer, .dim, "PID: ");
    try writer.print("{d}\n", .{info_item.pid});

    // Protocol & State
    try cc.write(writer, .dim, "\xed\x94\x84\xeb\xa1\x9c\xed\x86\xa0\xec\xbd\x9c: ");
    try writer.print("{s} ({s})\n", .{ info_item.protocol.toString(), info_item.state.toString() });

    // Bind address
    try cc.write(writer, .dim, "\xeb\xb0\x94\xec\x9d\xb8\xeb\x93\x9c: ");
    try writer.print("{s}\n", .{info_item.bind_address});

    // Command
    if (info_item.command.len > 0) {
        try cc.write(writer, .dim, "CMD: ");
        try writer.print("{s}\n", .{info_item.command});
    }

    // CWD
    if (info_item.cwd) |cwd| {
        try cc.write(writer, .dim, "CWD: ");
        try writer.print("{s}\n", .{cwd});
    }

    // Project
    if (info_item.project_name) |pn| {
        try cc.write(writer, .dim, "\xed\x94\x84\xeb\xa1\x9c\xec\xa0\x9d\xed\x8a\xb8: ");
        try cc.write(writer, .cyan, pn);
        try writer.writeByte('\n');
    }

    // Start time & uptime
    if (info_item.start_time) |st| {
        var time_buf: [64]u8 = undefined;
        const elapsed = time_util.calculateUptime(st);
        const uptime_str = time_util.formatUptime(&time_buf, elapsed);
        try cc.write(writer, .dim, "\xec\x97\x85\xed\x83\x80\xec\x9e\x84: ");
        try cc.write(writer, .yellow, uptime_str);
        try writer.writeByte('\n');
    }

    // Memory
    if (info_item.memory_rss) |mem| {
        var mem_buf: [64]u8 = undefined;
        const mem_str = time_util.formatMemory(&mem_buf, mem);
        try cc.write(writer, .dim, "\xeb\xa9\x94\xeb\xaa\xa8\xeb\xa6\xac: ");
        try writer.print("{s}\n", .{mem_str});
    }

    try writer.writeByte('\n');
}

// =============================================================================
// Inline tests
// =============================================================================

test "printDetailTo - basic" {
    const allocator = std.testing.allocator;
    var info_item = PortInfo{
        .port = 3000,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "node"),
        .pid = 28471,
        .command = try allocator.dupe(u8, "node /usr/local/bin/next dev"),
        .cwd = try allocator.dupe(u8, "/Users/x/projects/jagalchi-client"),
        .project_name = try allocator.dupe(u8, "jagalchi-client"),
        .start_time = null,
        .memory_rss = 312 * 1024 * 1024,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer info_item.deinit();

    var buf: [2048]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const cc = ColorConfig.initForced(false);
    try printDetailTo(stream.writer(), &info_item, cc);
    const output = stream.getWritten();

    try std.testing.expect(std.mem.indexOf(u8, output, ":3000") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "node") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "28471") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "jagalchi-client") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "312MB") != null);
}

test "printDetailTo - unknown process" {
    const allocator = std.testing.allocator;
    var info_item = PortInfo{
        .port = 8888,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "???"),
        .pid = 12847,
        .command = try allocator.dupe(u8, ""),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = false,
        .allocator = allocator,
    };
    defer info_item.deinit();

    var buf: [2048]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const cc = ColorConfig.initForced(false);
    try printDetailTo(stream.writer(), &info_item, cc);
    const output = stream.getWritten();

    try std.testing.expect(std.mem.indexOf(u8, output, ":8888") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "???") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "12847") != null);
}
