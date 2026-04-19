const std = @import("std");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;
const Protocol = port_info.Protocol;
const State = port_info.State;

/// Parse lsof -F formatted output into a list of PortInfo.
/// The -F format uses single-character prefixes:
///   p = PID, c = command, P = protocol, n = name (addr:port), T = TCP info
pub fn parseLsofOutput(allocator: std.mem.Allocator, output: []const u8) !std.ArrayListUnmanaged(PortInfo) {
    var results = std.ArrayListUnmanaged(PortInfo){};
    errdefer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    // HashMap for O(1) dedup: key = (port << 32 | pid)
    var seen = std.AutoHashMap(u64, void).init(allocator);
    defer seen.deinit();

    var current_pid: u32 = 0;
    var current_command: []const u8 = "";
    var current_port: ?u16 = null;
    var current_addr: []const u8 = "*";
    var current_state: State = .unknown;
    var current_protocol: Protocol = .tcp;
    var in_fd_section = false;

    var lines = std.mem.splitScalar(u8, output, '\n');
    while (lines.next()) |line| {
        if (line.len == 0) continue;

        const prefix = line[0];
        const value = line[1..];

        switch (prefix) {
            'p' => {
                if (in_fd_section and current_port != null) {
                    try appendEntry(allocator, &results, &seen, current_pid, current_command, current_port.?, current_addr, current_state, current_protocol);
                }
                current_pid = std.fmt.parseInt(u32, value, 10) catch 0;
                current_port = null;
                current_addr = "*";
                current_state = .unknown;
                current_protocol = .tcp;
                in_fd_section = false;
            },
            'c' => {
                current_command = value;
            },
            'f' => {
                if (in_fd_section and current_port != null) {
                    try appendEntry(allocator, &results, &seen, current_pid, current_command, current_port.?, current_addr, current_state, current_protocol);
                }
                current_port = null;
                current_addr = "*";
                current_state = .unknown;
                in_fd_section = true;
            },
            't' => {},
            'P' => {
                if (std.mem.eql(u8, value, "TCP")) {
                    current_protocol = .tcp;
                } else if (std.mem.eql(u8, value, "UDP")) {
                    current_protocol = .udp;
                }
            },
            'n' => {
                const parsed = parseNameField(value);
                current_addr = parsed.addr;
                current_port = parsed.port;
            },
            'T' => {
                if (std.mem.startsWith(u8, value, "ST=")) {
                    current_state = State.fromString(value[3..]);
                }
            },
            else => {},
        }
    }

    if (in_fd_section and current_port != null) {
        try appendEntry(allocator, &results, &seen, current_pid, current_command, current_port.?, current_addr, current_state, current_protocol);
    }

    return results;
}

const AddrPort = struct {
    addr: []const u8,
    port: ?u16,
};

/// Parse lsof name field: "*:3000", "127.0.0.1:8080", "[::1]:3000", "localhost:5432"
pub fn parseNameField(name: []const u8) AddrPort {
    if (name.len > 0 and name[0] == '[') {
        if (std.mem.lastIndexOfScalar(u8, name, ']')) |bracket_end| {
            const addr = name[0 .. bracket_end + 1];
            if (bracket_end + 1 < name.len and name[bracket_end + 1] == ':') {
                const port_str = name[bracket_end + 2 ..];
                const port = std.fmt.parseInt(u16, port_str, 10) catch return .{ .addr = addr, .port = null };
                return .{ .addr = addr, .port = port };
            }
            return .{ .addr = addr, .port = null };
        }
    }

    if (std.mem.lastIndexOfScalar(u8, name, ':')) |colon_pos| {
        const addr = if (colon_pos == 0) "*" else name[0..colon_pos];
        const port_str = name[colon_pos + 1 ..];
        const port = std.fmt.parseInt(u16, port_str, 10) catch return .{ .addr = addr, .port = null };
        return .{ .addr = addr, .port = port };
    }

    return .{ .addr = name, .port = null };
}

fn appendEntry(
    allocator: std.mem.Allocator,
    results: *std.ArrayListUnmanaged(PortInfo),
    seen: *std.AutoHashMap(u64, void),
    pid: u32,
    command: []const u8,
    port: u16,
    addr: []const u8,
    state: State,
    protocol: Protocol,
) !void {
    const key = (@as(u64, port) << 32) | @as(u64, pid);
    if (seen.contains(key)) return;
    try seen.put(key, {});

    const is_identified = command.len > 0;
    const name = if (is_identified) command else "???";

    try results.append(allocator, .{
        .port = port,
        .protocol = protocol,
        .process_name = try allocator.dupe(u8, name),
        .pid = pid,
        .command = try allocator.dupe(u8, command),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = state,
        .bind_address = try allocator.dupe(u8, addr),
        .is_identified = is_identified,
        .allocator = allocator,
    });
}

/// Run lsof and collect port information
pub fn collectPorts(allocator: std.mem.Allocator, include_all: bool) !std.ArrayListUnmanaged(PortInfo) {
    const lsof_output = try runLsof(allocator, include_all);
    defer allocator.free(lsof_output);

    return parseLsofOutput(allocator, lsof_output);
}

fn runLsof(allocator: std.mem.Allocator, include_all: bool) ![]const u8 {
    const listen_argv = [_][]const u8{ "lsof", "-i", "TCP", "-sTCP:LISTEN", "-P", "-n", "-F", "pcnPtT" };
    const all_argv = [_][]const u8{ "lsof", "-i", "TCP", "-P", "-n", "-F", "pcnPtT" };

    const argv: []const []const u8 = if (!include_all) &listen_argv else &all_argv;

    var child = std.process.Child.init(argv, allocator);
    child.stderr_behavior = .Ignore;
    child.stdout_behavior = .Pipe;

    try child.spawn();

    const stdout_file = child.stdout.?;
    var read_buf: [8192]u8 = undefined;
    var reader_w = stdout_file.reader(&read_buf);
    const output = try reader_w.interface.allocRemaining(allocator, .unlimited);
    _ = try child.wait();

    return output;
}

// =============================================================================
// Inline tests
// =============================================================================

test "parseNameField - standard" {
    const result = parseNameField("*:3000");
    try std.testing.expectEqualStrings("*", result.addr);
    try std.testing.expectEqual(@as(?u16, 3000), result.port);
}

test "parseNameField - localhost" {
    const result = parseNameField("127.0.0.1:8080");
    try std.testing.expectEqualStrings("127.0.0.1", result.addr);
    try std.testing.expectEqual(@as(?u16, 8080), result.port);
}

test "parseNameField - IPv6" {
    const result = parseNameField("[::1]:5432");
    try std.testing.expectEqualStrings("[::1]", result.addr);
    try std.testing.expectEqual(@as(?u16, 5432), result.port);
}

test "parseNameField - wildcard IPv6" {
    const result = parseNameField("[::]:3000");
    try std.testing.expectEqualStrings("[::]", result.addr);
    try std.testing.expectEqual(@as(?u16, 3000), result.port);
}

test "parseNameField - no port" {
    const result = parseNameField("somehost");
    try std.testing.expectEqualStrings("somehost", result.addr);
    try std.testing.expect(result.port == null);
}

test "parseLsofOutput - basic" {
    const allocator = std.testing.allocator;
    const input =
        \\p599
        \\crapportd
        \\f5
        \\tIPv6
        \\PTCP
        \\n*:50796
        \\TST=LISTEN
        \\p1234
        \\cnode
        \\f21
        \\tIPv4
        \\PTCP
        \\n127.0.0.1:3000
        \\TST=LISTEN
    ;

    var results = try parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 2), results.items.len);

    try std.testing.expectEqual(@as(u16, 50796), results.items[0].port);
    try std.testing.expectEqualStrings("rapportd", results.items[0].process_name);
    try std.testing.expectEqual(@as(u32, 599), results.items[0].pid);
    try std.testing.expectEqual(State.listen, results.items[0].state);
    try std.testing.expectEqualStrings("*", results.items[0].bind_address);

    try std.testing.expectEqual(@as(u16, 3000), results.items[1].port);
    try std.testing.expectEqualStrings("node", results.items[1].process_name);
    try std.testing.expectEqual(@as(u32, 1234), results.items[1].pid);
    try std.testing.expectEqualStrings("127.0.0.1", results.items[1].bind_address);
}

test "parseLsofOutput - deduplication" {
    const allocator = std.testing.allocator;
    const input =
        \\p1234
        \\cnode
        \\f21
        \\tIPv4
        \\PTCP
        \\n*:3000
        \\TST=LISTEN
        \\f22
        \\tIPv6
        \\PTCP
        \\n[::]:3000
        \\TST=LISTEN
    ;

    var results = try parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 1), results.items.len);
    try std.testing.expectEqual(@as(u16, 3000), results.items[0].port);
}

test "parseLsofOutput - multiple processes" {
    const allocator = std.testing.allocator;
    const input =
        \\p100
        \\cpostgres
        \\f10
        \\PTCP
        \\n*:5432
        \\TST=LISTEN
        \\p200
        \\cnode
        \\f20
        \\PTCP
        \\n*:3000
        \\TST=LISTEN
        \\p300
        \\cjava
        \\f30
        \\PTCP
        \\n*:8080
        \\TST=LISTEN
    ;

    var results = try parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 3), results.items.len);
    try std.testing.expectEqual(@as(u16, 5432), results.items[0].port);
    try std.testing.expectEqual(@as(u16, 3000), results.items[1].port);
    try std.testing.expectEqual(@as(u16, 8080), results.items[2].port);
}

test "parseLsofOutput - empty input" {
    const allocator = std.testing.allocator;
    var results = try parseLsofOutput(allocator, "");
    defer results.deinit(allocator);
    try std.testing.expectEqual(@as(usize, 0), results.items.len);
}

test "parseLsofOutput - unknown process" {
    const allocator = std.testing.allocator;
    const input =
        \\p9999
        \\c
        \\f5
        \\PTCP
        \\n*:8888
        \\TST=LISTEN
    ;

    var results = try parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 1), results.items.len);
    try std.testing.expectEqualStrings("???", results.items[0].process_name);
    try std.testing.expect(!results.items[0].is_identified);
}

test "parseLsofOutput - multiple FDs per process" {
    const allocator = std.testing.allocator;
    const input =
        \\p500
        \\cnginx
        \\f10
        \\PTCP
        \\n*:80
        \\TST=LISTEN
        \\f11
        \\PTCP
        \\n*:443
        \\TST=LISTEN
    ;

    var results = try parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 2), results.items.len);
    try std.testing.expectEqual(@as(u16, 80), results.items[0].port);
    try std.testing.expectEqual(@as(u16, 443), results.items[1].port);
}
