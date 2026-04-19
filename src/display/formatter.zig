const std = @import("std");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;
const color_mod = @import("color");
const ColorConfig = color_mod.ColorConfig;
const Color = color_mod.Color;
const time_util = @import("time_util");
const icons = @import("icons");

/// Column widths for the table
const Column = struct {
    port: usize,
    process: usize,
    project: usize,
    uptime: usize,
};

/// Calculate column widths based on data
fn calculateColumns(infos: []const PortInfo) Column {
    var col = Column{
        .port = 6,
        .process = 9,
        .project = 9,
        .uptime = 8,
    };

    for (infos) |info_item| {
        var port_buf: [8]u8 = undefined;
        const port_str = std.fmt.bufPrint(&port_buf, ":{d}", .{info_item.port}) catch ":???";
        col.port = @max(col.port, port_str.len);

        const proc_display = if (info_item.is_identified) info_item.process_name else "???";
        col.process = @max(col.process, proc_display.len);

        if (info_item.project_name) |pn| {
            col.project = @max(col.project, pn.len);
        } else if (!info_item.is_identified) {
            var pid_buf: [16]u8 = undefined;
            const pid_str = std.fmt.bufPrint(&pid_buf, "pid:{d}", .{info_item.pid}) catch "???";
            col.project = @max(col.project, pid_str.len);
        }

        if (info_item.start_time) |st| {
            var time_buf: [64]u8 = undefined;
            const uptime_str = time_util.formatUptime(&time_buf, time_util.calculateUptime(st));
            col.uptime = @max(col.uptime, uptime_str.len + 2);
        }
    }

    return col;
}

/// Print the port table to stdout
pub fn printTable(infos: []const PortInfo, cc: ColorConfig) !void {
    var out_buf: [8192]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    try printTableTo(&out.interface, infos, cc);
    try out.interface.flush();
}

/// Print the port table to any writer (useful for testing)
pub fn printTableTo(writer: anytype, infos: []const PortInfo, cc: ColorConfig) !void {
    if (infos.len == 0) {
        try cc.write(writer, .dim, "No open ports.\n");
        return;
    }

    const col = calculateColumns(infos);

    try writer.writeByte('\n');

    // Header with total count and globe emoji
    try cc.write(writer, .bold_cyan, "  \xf0\x9f\x8c\x90 ");
    try cc.writeCode(writer, .bold_cyan);
    try writer.print("{d} open ports\n\n", .{infos.len});
    try cc.writeReset(writer);

    try cc.writeCode(writer, .bold);
    try writer.print("  {s:<[1]}", .{ "PORT", col.port + 2 });
    try writer.print("{s:<[1]}", .{ "PROCESS", col.process + 4 }); // extra for icon
    try writer.print("{s:<[1]}", .{ "PROJECT", col.project + 2 });
    try writer.print("{s}", .{"UPTIME"});
    try cc.writeReset(writer);
    try writer.writeByte('\n');

    // Separator line
    try writer.writeAll("  ");
    try cc.writeCode(writer, .dim);
    {
        const total_width = col.port + 2 + col.process + 4 + col.project + 2 + 12;
        var sep_i: usize = 0;
        while (sep_i < total_width) : (sep_i += 1) {
            try writer.writeAll("\xe2\x94\x80"); // ─
        }
    }
    try cc.writeReset(writer);
    try writer.writeByte('\n');

    for (infos) |info_item| {
        try printRow(writer, &info_item, col, cc);
    }

    try writer.writeByte('\n');
}

fn printRow(writer: anytype, info_item: *const PortInfo, col: Column, cc: ColorConfig) !void {
    var port_buf: [8]u8 = undefined;
    const port_str = std.fmt.bufPrint(&port_buf, ":{d}", .{info_item.port}) catch ":???";

    try writer.writeAll("  ");
    try cc.write(writer, .bold_white, port_str);
    try writePadding(writer, col.port + 2, port_str.len);

    // Process name with icon
    const icon = icons.getProcessIcon(info_item.process_name);
    try writer.writeAll(icon);
    try writer.writeByte(' ');

    if (info_item.is_identified) {
        try cc.write(writer, .green, info_item.process_name);
        // icon + space = ~2 display columns, so add 2 to accounted len
        try writePadding(writer, col.process + 4, info_item.process_name.len + 2);
    } else {
        try cc.write(writer, .bold_red, "???");
        try writePadding(writer, col.process + 4, 3 + 2);
    }

    if (info_item.project_name) |pn| {
        try cc.write(writer, .cyan, pn);
        try writePadding(writer, col.project + 2, pn.len);
    } else if (!info_item.is_identified) {
        var pid_buf: [16]u8 = undefined;
        const pid_str = std.fmt.bufPrint(&pid_buf, "pid:{d}", .{info_item.pid}) catch "???";
        try cc.write(writer, .dim, pid_str);
        try writePadding(writer, col.project + 2, pid_str.len);
    } else {
        try cc.write(writer, .dim, "-");
        try writePadding(writer, col.project + 2, 1);
    }

    // Uptime with color coding
    if (info_item.start_time) |st| {
        var time_buf: [64]u8 = undefined;
        const elapsed = time_util.calculateUptime(st);
        const uptime_str = time_util.formatUptime(&time_buf, elapsed);
        const uptime_color = icons.getUptimeColor(elapsed);

        const c: Color = switch (uptime_color) {
            .green => .green,
            .yellow => .yellow,
            .red => .red,
        };
        try cc.writeCode(writer, c);
        try writer.writeAll("\xe2\xac\x86 ");
        try writer.writeAll(uptime_str);
        try cc.writeReset(writer);
    }

    if (!info_item.is_identified) {
        try writer.writeAll("  ");
        try cc.write(writer, .bold_red, "\xe2\x97\x8f unidentified");
    }

    try writer.writeByte('\n');
}

fn writePadding(writer: anytype, target_width: usize, current_len: usize) !void {
    if (current_len >= target_width) {
        try writer.writeByte(' ');
        return;
    }
    const padding = target_width - current_len;
    var i: usize = 0;
    while (i < padding) : (i += 1) {
        try writer.writeByte(' ');
    }
}

/// Print JSON output
pub fn printJson(allocator: std.mem.Allocator, infos: []const PortInfo) !void {
    var out_buf: [8192]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    try printJsonTo(allocator, &out.interface, infos);
    try out.interface.flush();
}

/// Print JSON output to any writer
pub fn printJsonTo(allocator: std.mem.Allocator, writer: anytype, infos: []const PortInfo) !void {
    try writer.writeByte('[');
    for (infos, 0..) |info_item, i| {
        if (i > 0) try writer.writeByte(',');
        try writer.writeByte('\n');
        try writeJsonEntry(allocator, writer, &info_item);
    }
    if (infos.len > 0) try writer.writeByte('\n');
    try writer.writeAll("]\n");
}

fn writeJsonEntry(allocator: std.mem.Allocator, writer: anytype, info_item: *const PortInfo) !void {
    _ = allocator;
    try writer.writeAll("  {");
    try writer.print("\"port\":{d}", .{info_item.port});
    try writer.print(",\"protocol\":\"{s}\"", .{info_item.protocol.toString()});
    try writer.print(",\"process\":\"{s}\"", .{info_item.process_name});
    try writer.print(",\"pid\":{d}", .{info_item.pid});
    try writer.print(",\"state\":\"{s}\"", .{info_item.state.toString()});
    try writer.print(",\"bind_address\":\"{s}\"", .{info_item.bind_address});
    try writer.print(",\"identified\":{}", .{info_item.is_identified});

    if (info_item.cwd) |cwd| {
        try writer.print(",\"cwd\":\"{s}\"", .{cwd});
    }
    if (info_item.project_name) |pn| {
        try writer.print(",\"project\":\"{s}\"", .{pn});
    }
    if (info_item.memory_rss) |mem| {
        try writer.print(",\"memory_rss\":{d}", .{mem});
    }
    if (info_item.start_time) |st| {
        try writer.print(",\"start_time\":{d}", .{st});
    }

    try writer.writeByte('}');
}

// =============================================================================
// Inline tests
// =============================================================================

test "printTableTo - empty" {
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const cc = ColorConfig.initForced(false);
    const infos = [_]PortInfo{};
    try printTableTo(stream.writer(), &infos, cc);
    try std.testing.expectEqualStrings("No open ports.\n", stream.getWritten());
}

test "printTableTo - single entry" {
    const allocator = std.testing.allocator;
    var info_item = PortInfo{
        .port = 3000,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "node"),
        .pid = 1234,
        .command = try allocator.dupe(u8, "node server.js"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer info_item.deinit();

    var buf: [1024]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const cc = ColorConfig.initForced(false);
    const infos = [_]PortInfo{info_item};
    try printTableTo(stream.writer(), &infos, cc);
    const output = stream.getWritten();

    try std.testing.expect(std.mem.indexOf(u8, output, "PORT") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "PROCESS") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, ":3000") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "node") != null);
}

test "printJsonTo - empty" {
    const allocator = std.testing.allocator;
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const infos = [_]PortInfo{};
    try printJsonTo(allocator, stream.writer(), &infos);
    try std.testing.expectEqualStrings("[]\n", stream.getWritten());
}

test "printJsonTo - single entry" {
    const allocator = std.testing.allocator;
    var info_item = PortInfo{
        .port = 3000,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "node"),
        .pid = 1234,
        .command = try allocator.dupe(u8, "node server.js"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer info_item.deinit();

    var buf: [1024]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const infos = [_]PortInfo{info_item};
    try printJsonTo(allocator, stream.writer(), &infos);
    const output = stream.getWritten();

    try std.testing.expect(std.mem.indexOf(u8, output, "\"port\":3000") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "\"process\":\"node\"") != null);
    try std.testing.expect(std.mem.indexOf(u8, output, "\"pid\":1234") != null);
}

test "writePadding" {
    var buf: [64]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try writePadding(stream.writer(), 10, 4);
    try std.testing.expectEqual(@as(usize, 6), stream.getWritten().len);

    stream.reset();
    try writePadding(stream.writer(), 5, 10);
    try std.testing.expectEqual(@as(usize, 1), stream.getWritten().len);
}

test "calculateColumns - basic" {
    const allocator = std.testing.allocator;
    var info_item = PortInfo{
        .port = 3000,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "long-process-name"),
        .pid = 1234,
        .command = try allocator.dupe(u8, "cmd"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer info_item.deinit();

    const infos = [_]PortInfo{info_item};
    const col = calculateColumns(&infos);
    try std.testing.expect(col.process >= "long-process-name".len);
}
