const std = @import("std");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;
const color_mod = @import("color");
const ColorConfig = color_mod.ColorConfig;
const time_util = @import("time_util");
const icons = @import("icons");

/// Print ports grouped by process name
pub fn printGrouped(infos: []const PortInfo, cc: ColorConfig) !void {
    var out_buf: [16384]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    try printGroupedTo(&out.interface, infos, cc);
    try out.interface.flush();
}

/// Print grouped output to any writer
pub fn printGroupedTo(writer: anytype, infos: []const PortInfo, cc: ColorConfig) !void {
    if (infos.len == 0) {
        try cc.write(writer, .dim, "No open ports.\n");
        return;
    }

    // Header with total count
    try writer.writeByte('\n');
    try cc.write(writer, .bold_cyan, "\xf0\x9f\x8c\x90 ");
    try cc.writeCode(writer, .bold_cyan);
    try writer.print("{d} open ports\n", .{infos.len});
    try cc.writeReset(writer);

    // Build groups: collect unique process names, then list ports for each
    // Since we can't use a HashMap with the fixed buffer approach, we'll
    // collect groups by scanning through sorted-by-name infos.
    // We need to track which process names we've already seen.
    var seen_count: usize = 0;
    var seen_names: [256][]const u8 = undefined;

    for (infos) |*info| {
        const name = if (info.is_identified) info.process_name else "???";
        var already_seen = false;
        for (seen_names[0..seen_count]) |seen| {
            if (std.mem.eql(u8, seen, name)) {
                already_seen = true;
                break;
            }
        }
        if (already_seen) continue;
        if (seen_count < 256) {
            seen_names[seen_count] = name;
            seen_count += 1;
        }

        // Count ports for this process
        var port_count: usize = 0;
        for (infos) |*check| {
            const check_name = if (check.is_identified) check.process_name else "???";
            if (std.mem.eql(u8, check_name, name)) {
                port_count += 1;
            }
        }

        try writer.writeByte('\n');

        // Process header with icon
        const icon = icons.getProcessIcon(name);
        try writer.writeAll(icon);
        try writer.writeByte(' ');
        try cc.write(writer, .bold_white, name);
        try cc.writeCode(writer, .dim);
        try writer.print(" ({d} ports)", .{port_count});
        try cc.writeReset(writer);
        try writer.writeByte('\n');

        // Print each port for this process
        for (infos) |*sub_info| {
            const sub_name = if (sub_info.is_identified) sub_info.process_name else "???";
            if (!std.mem.eql(u8, sub_name, name)) continue;

            try writer.writeAll("  ");

            // Port
            var port_buf: [8]u8 = undefined;
            const port_str = std.fmt.bufPrint(&port_buf, ":{d}", .{sub_info.port}) catch ":???";
            try cc.write(writer, .bold_white, port_str);

            // Padding after port
            const port_pad = 8 -| port_str.len;
            var pad_i: usize = 0;
            while (pad_i < port_pad) : (pad_i += 1) try writer.writeByte(' ');

            // Uptime with color
            if (sub_info.start_time) |st| {
                var time_buf: [64]u8 = undefined;
                const elapsed = time_util.calculateUptime(st);
                const uptime_str = time_util.formatUptime(&time_buf, elapsed);
                const uptime_color = icons.getUptimeColor(elapsed);

                const color_code: color_mod.Color = switch (uptime_color) {
                    .green => .green,
                    .yellow => .yellow,
                    .red => .red,
                };

                try cc.writeCode(writer, color_code);
                try writer.writeAll("\xe2\xac\x86 "); // ⬆
                try writer.writeAll(uptime_str);
                try cc.writeReset(writer);
            } else {
                try cc.write(writer, .dim, "-");
            }

            // Project/CWD
            try writer.writeAll("      ");
            if (sub_info.project_name) |pn| {
                try cc.write(writer, .cyan, pn);
            } else if (sub_info.cwd) |cwd| {
                // Shorten home dir
                try cc.write(writer, .dim, shortenPath(cwd));
            } else {
                try cc.write(writer, .dim, "-");
            }

            try writer.writeByte('\n');
        }
    }

    try writer.writeByte('\n');
}

fn shortenPath(path: []const u8) []const u8 {
    // Try to shorten /Users/xxx/... to ~/...
    if (std.mem.startsWith(u8, path, "/Users/")) {
        if (std.mem.indexOfScalarPos(u8, path, 7, '/')) |slash| {
            return path[slash..]; // Returns /projects/app etc
        }
    }
    if (std.mem.startsWith(u8, path, "/home/")) {
        if (std.mem.indexOfScalarPos(u8, path, 6, '/')) |slash| {
            return path[slash..];
        }
    }
    return path;
}

// =============================================================================
// Inline tests
// =============================================================================

test "printGroupedTo - empty" {
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    const cc = ColorConfig.initForced(false);
    const infos = [_]PortInfo{};
    try printGroupedTo(stream.writer(), &infos, cc);
    try std.testing.expectEqualStrings("No open ports.\n", stream.getWritten());
}

test "shortenPath" {
    try std.testing.expectEqualStrings("/projects/app", shortenPath("/Users/x/projects/app"));
    try std.testing.expectEqualStrings("/code/app", shortenPath("/home/user/code/app"));
    try std.testing.expectEqualStrings("/tmp/something", shortenPath("/tmp/something"));
}
