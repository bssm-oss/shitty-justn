const std = @import("std");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;
const project_util = @import("project_util");

/// Enrich PortInfo entries with CWD, memory, and start time info
pub fn enrichPortInfos(allocator: std.mem.Allocator, infos: []PortInfo) void {
    if (infos.len == 0) return;

    collectCwds(allocator, infos);
    collectPsInfo(allocator, infos);

    // Project detection with path caching
    var project_cache = std.StringHashMap(?[]const u8).init(allocator);
    defer project_cache.deinit();

    for (infos) |*info| {
        if (info.cwd) |cwd| {
            if (project_cache.get(cwd)) |cached| {
                info.project_name = if (cached) |name| allocator.dupe(u8, name) catch null else null;
            } else {
                const name = project_util.detectProjectName(allocator, cwd);
                project_cache.put(cwd, name) catch {};
                info.project_name = name;
            }
        }
    }
}

fn collectCwds(allocator: std.mem.Allocator, infos: []PortInfo) void {
    var pid_buf: [4096]u8 = undefined;
    var stream = std.io.fixedBufferStream(&pid_buf);
    const writer = stream.writer();

    var first = true;
    for (infos) |info| {
        if (!first) writer.writeByte(',') catch return;
        writer.print("{d}", .{info.pid}) catch return;
        first = false;
    }

    const pid_list = pid_buf[0..stream.pos];

    const argv = [_][]const u8{ "lsof", "-d", "cwd", "-p", pid_list, "-Fn" };
    var child = std.process.Child.init(&argv, allocator);
    child.stderr_behavior = .Ignore;
    child.stdout_behavior = .Pipe;

    child.spawn() catch return;

    const stdout_file = child.stdout.?;
    var read_buf: [8192]u8 = undefined;
    var reader_w = stdout_file.reader(&read_buf);
    const output = reader_w.interface.allocRemaining(allocator, .unlimited) catch {
        _ = child.wait() catch {};
        return;
    };
    defer allocator.free(output);
    _ = child.wait() catch {};

    var current_pid: u32 = 0;
    var lines = std.mem.splitScalar(u8, output, '\n');
    while (lines.next()) |line| {
        if (line.len == 0) continue;
        switch (line[0]) {
            'p' => {
                current_pid = std.fmt.parseInt(u32, line[1..], 10) catch 0;
            },
            'n' => {
                if (current_pid > 0) {
                    const cwd_path = line[1..];
                    for (infos) |*info| {
                        if (info.pid == current_pid and info.cwd == null) {
                            info.cwd = allocator.dupe(u8, cwd_path) catch null;
                        }
                    }
                }
            },
            else => {},
        }
    }
}

/// Single `ps -o pid=,rss=,lstart=` call for all PIDs at once
fn collectPsInfo(allocator: std.mem.Allocator, infos: []PortInfo) void {
    // Build unique PID list
    var pid_buf: [4096]u8 = undefined;
    var stream = std.io.fixedBufferStream(&pid_buf);
    const writer = stream.writer();

    var seen_pids = std.AutoHashMap(u32, void).init(allocator);
    defer seen_pids.deinit();

    var first = true;
    for (infos) |info| {
        if (seen_pids.contains(info.pid)) continue;
        seen_pids.put(info.pid, {}) catch continue;
        if (!first) writer.writeByte(',') catch return;
        writer.print("{d}", .{info.pid}) catch return;
        first = false;
    }

    if (stream.pos == 0) return;

    const pid_list = pid_buf[0..stream.pos];
    const argv = [_][]const u8{ "ps", "-p", pid_list, "-o", "pid=,rss=,lstart=" };
    var child = std.process.Child.init(&argv, allocator);
    child.stderr_behavior = .Ignore;
    child.stdout_behavior = .Pipe;

    var env_map = std.process.EnvMap.init(allocator);
    defer env_map.deinit();
    env_map.put("LANG", "C") catch return;
    child.env_map = &env_map;

    child.spawn() catch return;

    const stdout_file = child.stdout.?;
    var read_buf: [16384]u8 = undefined;
    var reader_w = stdout_file.reader(&read_buf);
    const output = reader_w.interface.allocRemaining(allocator, .unlimited) catch {
        _ = child.wait() catch {};
        return;
    };
    defer allocator.free(output);
    _ = child.wait() catch {};

    // Parse output: each line is "  PID   RSS   LSTART..."
    // Example: "  1234  12345 Mon Apr  7 14:32:00 2025"
    var lines = std.mem.splitScalar(u8, output, '\n');
    while (lines.next()) |line| {
        const trimmed = std.mem.trim(u8, line, " \t\r");
        if (trimmed.len == 0) continue;

        // Tokenize: PID, RSS, then rest is lstart
        var tokens = std.mem.tokenizeAny(u8, trimmed, " \t");
        const pid_str = tokens.next() orelse continue;
        const rss_str = tokens.next() orelse continue;

        const pid = std.fmt.parseInt(u32, pid_str, 10) catch continue;
        const rss_kb = std.fmt.parseInt(u64, rss_str, 10) catch continue;

        // Rest of line is lstart date
        const rest = tokens.rest();
        const start_time = if (rest.len > 0) parseLstartDate(rest) else null;

        // Apply to all matching infos
        for (infos) |*info| {
            if (info.pid == pid) {
                info.memory_rss = rss_kb * 1024;
                info.start_time = start_time;
            }
        }
    }
}

/// Parse ps lstart format: "Mon Apr  7 14:32:00 2025"
pub fn parseLstartDate(s: []const u8) ?i64 {
    var tokens: [6][]const u8 = undefined;
    var token_count: usize = 0;
    var iter = std.mem.tokenizeAny(u8, s, " ");
    while (iter.next()) |tok| {
        if (token_count >= 6) break;
        tokens[token_count] = tok;
        token_count += 1;
    }

    if (token_count < 5) return null;

    const month_str = tokens[1];
    const day_str = tokens[2];
    const time_str = tokens[3];
    const year_str = tokens[4];

    const month = monthToNum(month_str) orelse return null;
    const day = std.fmt.parseInt(u8, day_str, 10) catch return null;
    const year = std.fmt.parseInt(u16, year_str, 10) catch return null;

    var time_parts = std.mem.splitScalar(u8, time_str, ':');
    const hour_str = time_parts.next() orelse return null;
    const min_str = time_parts.next() orelse return null;
    const sec_str = time_parts.next() orelse return null;

    const hour = std.fmt.parseInt(u8, hour_str, 10) catch return null;
    const minute = std.fmt.parseInt(u8, min_str, 10) catch return null;
    const second = std.fmt.parseInt(u8, sec_str, 10) catch return null;

    const epoch_day = dateToEpochDay(year, month, day) orelse return null;
    const epoch_seconds = @as(i64, epoch_day) * 86400 + @as(i64, hour) * 3600 + @as(i64, minute) * 60 + @as(i64, second);

    return epoch_seconds;
}

fn monthToNum(m: []const u8) ?u8 {
    const months = [_][]const u8{ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
    for (months, 0..) |name, i| {
        if (std.mem.eql(u8, m, name)) return @intCast(i + 1);
    }
    return null;
}

fn dateToEpochDay(year: u16, month: u8, day: u8) ?i64 {
    if (month < 1 or month > 12) return null;
    if (day < 1 or day > 31) return null;

    const y: i32 = @as(i32, year);
    const m: i32 = @as(i32, month);
    const d: i32 = @as(i32, day);

    const adjusted_year = y - @as(i32, if (m <= 2) @as(i32, 1) else @as(i32, 0));
    const era: i32 = @divTrunc(if (adjusted_year >= 0) adjusted_year else adjusted_year - 399, 400);
    const yoe: i32 = adjusted_year - era * 400;
    const doy: i32 = @divTrunc((153 * (m + (if (m > 2) @as(i32, -3) else @as(i32, 9))) + 2), 5) + d - 1;
    const doe: i32 = yoe * 365 + @divTrunc(yoe, 4) - @divTrunc(yoe, 100) + doy;
    const epoch_day: i64 = @as(i64, era) * 146097 + @as(i64, doe) - 719468;

    return epoch_day;
}

// =============================================================================
// Inline tests
// =============================================================================

test "parseLstartDate - basic" {
    const result = parseLstartDate("Mon Apr  7 14:32:00 2025");
    try std.testing.expect(result != null);
    try std.testing.expect(result.? > 1735689600);
}

test "parseLstartDate - january" {
    const result = parseLstartDate("Wed Jan  1 00:00:00 2025");
    try std.testing.expect(result != null);
    try std.testing.expectEqual(@as(i64, 1735689600), result.?);
}

test "parseLstartDate - invalid" {
    try std.testing.expect(parseLstartDate("") == null);
    try std.testing.expect(parseLstartDate("not a date") == null);
    try std.testing.expect(parseLstartDate("Mon Xxx  1 00:00:00 2025") == null);
}

test "monthToNum" {
    try std.testing.expectEqual(@as(?u8, 1), monthToNum("Jan"));
    try std.testing.expectEqual(@as(?u8, 4), monthToNum("Apr"));
    try std.testing.expectEqual(@as(?u8, 12), monthToNum("Dec"));
    try std.testing.expectEqual(@as(?u8, null), monthToNum("Xxx"));
}

test "dateToEpochDay" {
    try std.testing.expectEqual(@as(?i64, 0), dateToEpochDay(1970, 1, 1));
    const day_2025 = dateToEpochDay(2025, 1, 1);
    try std.testing.expect(day_2025 != null);
    try std.testing.expectEqual(@as(i64, 20089), day_2025.?);
}
