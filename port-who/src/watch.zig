const std = @import("std");
const port_info_mod = @import("port_info");
const PortInfo = port_info_mod.PortInfo;
const collector = @import("collector");
const process_mod = @import("process");
const color_mod = @import("color");
const ColorConfig = color_mod.ColorConfig;
const time_util = @import("time_util");
const icons = @import("icons");

/// Run the watch mode TUI
pub fn runWatch(allocator: std.mem.Allocator, show_all: bool, cc: ColorConfig) !void {
    // Set up terminal for raw input
    setupTerminal();
    defer restoreTerminal();

    // Track previously seen ports for highlight
    var prev_ports = std.AutoHashMap(u16, void).init(allocator);
    defer prev_ports.deinit();
    var new_ports = std.AutoHashMap(u16, void).init(allocator);
    defer new_ports.deinit();

    var iteration: u32 = 0;

    while (true) {
        // Check for quit input (non-blocking)
        if (checkQuit()) break;

        // Collect port info
        var infos = collector.collectPorts(allocator, show_all) catch {
            std.Thread.sleep(2 * std.time.ns_per_s);
            continue;
        };
        defer {
            for (infos.items) |*item| item.deinit();
            infos.deinit(allocator);
        }

        // Enrich
        process_mod.enrichPortInfos(allocator, infos.items);

        // Sort by port
        std.mem.sort(PortInfo, infos.items, {}, PortInfo.compareByPort);

        // Determine new/disappeared ports
        new_ports.clearRetainingCapacity();

        for (infos.items) |info| {
            if (!prev_ports.contains(info.port)) {
                new_ports.put(info.port, {}) catch {};
            }
        }

        // Render screen
        clearScreen();
        renderWatch(allocator, infos.items, cc, &new_ports, iteration);

        // Update prev_ports
        prev_ports.clearRetainingCapacity();
        for (infos.items) |info| {
            prev_ports.put(info.port, {}) catch {};
        }

        iteration += 1;

        // Sleep 2 seconds, checking for quit every 100ms
        var sleep_count: u32 = 0;
        while (sleep_count < 20) : (sleep_count += 1) {
            std.Thread.sleep(100 * std.time.ns_per_ms);
            if (checkQuit()) {
                return;
            }
        }
    }
}

fn renderWatch(allocator: std.mem.Allocator, infos: []const PortInfo, cc: ColorConfig, new_ports: *const std.AutoHashMap(u16, void), iteration: u32) void {
    _ = allocator;

    var out_buf: [16384]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    const writer = &out.interface;

    // Header
    cc.write(writer, .bold_cyan, "\xf0\x9f\x8c\x90 port-who watch") catch return;
    writer.writeAll("  ") catch return;
    cc.write(writer, .dim, "[q: quit]") catch return;
    writer.writeByte('\n') catch return;

    // Timestamp
    cc.writeCode(writer, .dim) catch return;
    writer.writeAll("Last update: ") catch return;
    {
        const now_ts = std.time.timestamp();
        const hours: u64 = @intCast(@mod(@as(u64, @intCast(now_ts)), 86400) / 3600);
        const minutes: u64 = @intCast(@mod(@as(u64, @intCast(now_ts)), 3600) / 60);
        const seconds: u64 = @intCast(@mod(@as(u64, @intCast(now_ts)), 60));
        writer.print("{d:0>2}:{d:0>2}:{d:0>2} UTC", .{ hours, minutes, seconds }) catch return;
    }
    cc.writeReset(writer) catch return;
    writer.writeByte('\n') catch return;

    // Count line
    cc.writeCode(writer, .bold_cyan) catch return;
    writer.print("Open ports: {d}", .{infos.len}) catch return;
    cc.writeReset(writer) catch return;
    writer.writeByte('\n') catch return;

    // Separator
    cc.write(writer, .dim, "\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\n") catch return;

    // Table header
    cc.writeCode(writer, .bold) catch return;
    writer.print("  {s:<8}{s:<16}{s:<16}{s}\n", .{ "PORT", "PROCESS", "PROJECT", "UPTIME" }) catch return;
    cc.writeReset(writer) catch return;

    _ = iteration;

    // Rows
    for (infos) |*info| {
        const is_new = new_ports.contains(info.port);

        writer.writeAll("  ") catch return;

        // Port (bold, green if new)
        var port_buf: [8]u8 = undefined;
        const port_str = std.fmt.bufPrint(&port_buf, ":{d}", .{info.port}) catch ":???";
        if (is_new) {
            cc.write(writer, .bold_green, port_str) catch return;
        } else {
            cc.write(writer, .bold_white, port_str) catch return;
        }
        {
            const pad = 8 -| port_str.len;
            var pi: usize = 0;
            while (pi < pad) : (pi += 1) writer.writeByte(' ') catch return;
        }

        // Process with icon
        const icon = icons.getProcessIcon(info.process_name);
        writer.writeAll(icon) catch return;
        writer.writeByte(' ') catch return;
        if (info.is_identified) {
            if (is_new) {
                cc.write(writer, .bold_green, info.process_name) catch return;
            } else {
                cc.write(writer, .green, info.process_name) catch return;
            }
        } else {
            cc.write(writer, .bold_red, "???") catch return;
        }
        {
            // Icon takes ~1-4 bytes display = ~2 columns. process_name padding to 14 cols
            const name_len = if (info.is_identified) info.process_name.len else 3;
            const display_len = name_len + 2; // icon + space ~ 2 display columns
            const pad = 16 -| display_len;
            var pi: usize = 0;
            while (pi < pad) : (pi += 1) writer.writeByte(' ') catch return;
        }

        // Project
        if (info.project_name) |pn| {
            cc.write(writer, .cyan, pn) catch return;
            const pad = 16 -| pn.len;
            var pi: usize = 0;
            while (pi < pad) : (pi += 1) writer.writeByte(' ') catch return;
        } else {
            cc.write(writer, .dim, "-") catch return;
            {
                var pi: usize = 0;
                while (pi < 15) : (pi += 1) writer.writeByte(' ') catch return;
            }
        }

        // Uptime with color
        if (info.start_time) |st| {
            var time_buf: [64]u8 = undefined;
            const elapsed = time_util.calculateUptime(st);
            const uptime_str = time_util.formatUptime(&time_buf, elapsed);
            const uptime_color = icons.getUptimeColor(elapsed);
            const c: color_mod.Color = switch (uptime_color) {
                .green => .green,
                .yellow => .yellow,
                .red => .red,
            };
            cc.writeCode(writer, c) catch return;
            writer.writeAll("\xe2\xac\x86 ") catch return;
            writer.writeAll(uptime_str) catch return;
            cc.writeReset(writer) catch return;
        }

        writer.writeByte('\n') catch return;
    }

    writer.writeByte('\n') catch return;
    out.interface.flush() catch return;
}

fn clearScreen() void {
    var out_buf: [64]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    // Move cursor to top-left and clear screen
    out.interface.writeAll("\x1b[2J\x1b[H") catch return;
    out.interface.flush() catch return;
}

// Terminal raw mode for non-blocking key reads
var original_termios: ?std.posix.termios = null;

fn setupTerminal() void {
    const stdin_fd = std.posix.STDIN_FILENO;
    original_termios = std.posix.tcgetattr(stdin_fd) catch null;
    if (original_termios) |orig| {
        var raw = orig;
        // Disable canonical mode and echo
        raw.lflag = std.posix.tc_lflag_t{
            .ECHO = false,
            .ICANON = false,
            .ISIG = false, // We handle Ctrl+C ourselves
            .IEXTEN = false,
        };
        // Minimum 0 bytes, timeout 0 (non-blocking)
        raw.cc[@intFromEnum(std.posix.V.MIN)] = 0;
        raw.cc[@intFromEnum(std.posix.V.TIME)] = 0;
        std.posix.tcsetattr(stdin_fd, .NOW, raw) catch {};
    }
}

fn restoreTerminal() void {
    if (original_termios) |orig| {
        std.posix.tcsetattr(std.posix.STDIN_FILENO, .NOW, orig) catch {};
    }
    // Show cursor if hidden
    var out_buf: [32]u8 = undefined;
    var out = std.fs.File.stdout().writer(&out_buf);
    out.interface.writeAll("\x1b[?25h") catch return;
    out.interface.flush() catch return;
}

fn checkQuit() bool {
    // Non-blocking read using posix directly (terminal is in raw mode with VMIN=0, VTIME=0)
    var buf: [1]u8 = undefined;
    const n = std.posix.read(std.posix.STDIN_FILENO, &buf) catch return false;
    if (n == 0) return false;
    // 'q', 'Q', or Ctrl+C (0x03)
    return buf[0] == 'q' or buf[0] == 'Q' or buf[0] == 0x03;
}
