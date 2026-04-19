const std = @import("std");

pub const SortBy = enum {
    port,
    uptime,
    memory,

    pub fn fromString(s: []const u8) ?SortBy {
        if (std.mem.eql(u8, s, "port")) return .port;
        if (std.mem.eql(u8, s, "uptime")) return .uptime;
        if (std.mem.eql(u8, s, "memory")) return .memory;
        return null;
    }
};

/// Port filter: single port, range, or list of ports
pub const PortFilter = union(enum) {
    none: void,
    single: u16,
    range: struct { min: u16, max: u16 },
    list: []const u16,
};

pub const ListOptions = struct {
    show_all: bool = false,
    sort_by: SortBy = .port,
    json: bool = false,
    group: bool = false,
    port_filter: PortFilter = .{ .none = {} },
};

pub const WatchOptions = struct {
    show_all: bool = false,
};

pub const Command = union(enum) {
    list: ListOptions,
    detail: u16,
    kill: u16,
    watch: WatchOptions,
    help: void,
    version: void,
    err: []const u8,
};

/// Parse a port string like ":3000" or "3000" into a u16
pub fn parsePort(s: []const u8) ?u16 {
    const port_str = if (s.len > 0 and s[0] == ':') s[1..] else s;
    if (port_str.len == 0) return null;
    return std.fmt.parseInt(u16, port_str, 10) catch null;
}

/// Parse a port range like ":3000-4000" or "3000-4000"
pub fn parsePortRange(s: []const u8) ?struct { min: u16, max: u16 } {
    const port_str = if (s.len > 0 and s[0] == ':') s[1..] else s;
    if (port_str.len == 0) return null;

    // Look for dash separating two numbers
    if (std.mem.indexOfScalar(u8, port_str, '-')) |dash_pos| {
        if (dash_pos == 0 or dash_pos == port_str.len - 1) return null;
        const min_str = port_str[0..dash_pos];
        const max_str = port_str[dash_pos + 1 ..];
        const min = std.fmt.parseInt(u16, min_str, 10) catch return null;
        const max = std.fmt.parseInt(u16, max_str, 10) catch return null;
        if (min > max) return null;
        return .{ .min = min, .max = max };
    }
    return null;
}

/// Parse a comma-separated port list like ":3000,8080,5432" or "3000,8080,5432"
/// Returns a static buffer of up to 32 ports
pub const MAX_PORT_LIST = 32;
var port_list_buf: [MAX_PORT_LIST]u16 = undefined;

pub fn parsePortList(s: []const u8) ?[]const u16 {
    const port_str = if (s.len > 0 and s[0] == ':') s[1..] else s;
    if (port_str.len == 0) return null;

    // Must contain at least one comma
    if (std.mem.indexOfScalar(u8, port_str, ',') == null) return null;

    var count: usize = 0;
    var iter = std.mem.splitScalar(u8, port_str, ',');
    while (iter.next()) |part| {
        if (count >= MAX_PORT_LIST) return null;
        const trimmed = std.mem.trim(u8, part, " ");
        if (trimmed.len == 0) continue;
        const port = std.fmt.parseInt(u16, trimmed, 10) catch return null;
        port_list_buf[count] = port;
        count += 1;
    }
    if (count == 0) return null;
    return port_list_buf[0..count];
}

/// Check if a port passes the filter
pub fn portPassesFilter(port: u16, filter: PortFilter) bool {
    switch (filter) {
        .none => return true,
        .single => |p| return port == p,
        .range => |r| return port >= r.min and port <= r.max,
        .list => |ports| {
            for (ports) |p| {
                if (port == p) return true;
            }
            return false;
        },
    }
}

/// Parse CLI arguments into a Command.
/// `args` should NOT include argv[0] (the program name).
pub fn parseArgs(args: []const []const u8) Command {
    if (args.len == 0) {
        return .{ .list = .{} };
    }

    var opts = ListOptions{};
    var i: usize = 0;
    var saw_kill = false;
    var saw_watch = false;
    var explicit_port: ?u16 = null;
    var has_port_filter = false;

    while (i < args.len) : (i += 1) {
        const arg = args[i];

        if (std.mem.eql(u8, arg, "--help") or std.mem.eql(u8, arg, "-h")) {
            return .{ .help = {} };
        }
        if (std.mem.eql(u8, arg, "--version") or std.mem.eql(u8, arg, "-v")) {
            return .{ .version = {} };
        }
        if (std.mem.eql(u8, arg, "--all") or std.mem.eql(u8, arg, "-a")) {
            opts.show_all = true;
            continue;
        }
        if (std.mem.eql(u8, arg, "--json") or std.mem.eql(u8, arg, "-j")) {
            opts.json = true;
            continue;
        }
        if (std.mem.eql(u8, arg, "--group") or std.mem.eql(u8, arg, "-g")) {
            opts.group = true;
            continue;
        }
        if (std.mem.eql(u8, arg, "--sort") or std.mem.eql(u8, arg, "-s")) {
            i += 1;
            if (i >= args.len) {
                return .{ .err = "--sort requires a value (port|uptime|memory)" };
            }
            if (SortBy.fromString(args[i])) |sort| {
                opts.sort_by = sort;
            } else {
                return .{ .err = "Invalid sort criteria. Choose from: port, uptime, memory." };
            }
            continue;
        }
        if (std.mem.eql(u8, arg, "kill")) {
            saw_kill = true;
            continue;
        }
        if (std.mem.eql(u8, arg, "watch")) {
            saw_watch = true;
            continue;
        }

        // Try to parse as port range (e.g., :3000-4000)
        if (!has_port_filter) {
            if (parsePortRange(arg)) |range| {
                opts.port_filter = .{ .range = .{ .min = range.min, .max = range.max } };
                has_port_filter = true;
                continue;
            }
        }

        // Try to parse as port list (e.g., :3000,8080,5432)
        if (!has_port_filter) {
            if (parsePortList(arg)) |ports| {
                opts.port_filter = .{ .list = ports };
                has_port_filter = true;
                continue;
            }
        }

        // Try to parse as port number
        if (parsePort(arg)) |port| {
            explicit_port = port;
            continue;
        }

        // Unknown argument
        return .{ .err = "Unknown argument." };
    }

    if (saw_watch) {
        return .{ .watch = .{ .show_all = opts.show_all } };
    }

    if (saw_kill) {
        if (explicit_port) |port| {
            return .{ .kill = port };
        }
        return .{ .err = "kill command requires a port number. e.g. port-who kill :3000" };
    }

    if (explicit_port) |port| {
        if (!has_port_filter) {
            return .{ .detail = port };
        }
    }

    return .{ .list = opts };
}

pub fn printHelp(writer: anytype) !void {
    try writer.writeAll(
        \\Usage: port-who [OPTIONS] [COMMAND]
        \\
        \\  Beautiful CLI that shows which processes are using which ports
        \\
        \\Commands:
        \\  (none)              List open ports
        \\  :PORT or PORT       Show details for a specific port
        \\  :MIN-MAX            Filter by port range (e.g. :3000-4000)
        \\  :P1,P2,P3           Filter by port list (e.g. :3000,8080,5432)
        \\  kill :PORT          Kill the process occupying a port
        \\  watch               Live monitoring (q or Ctrl+C to quit)
        \\
        \\Options:
        \\  -a, --all           Show all including ESTABLISHED
        \\  -s, --sort VALUE    Sort by (port|uptime|memory)
        \\  -g, --group         Group by process
        \\  -j, --json          JSON output
        \\  -h, --help          Show help
        \\  -v, --version       Show version
        \\
        \\Examples:
        \\  port-who                     Show all open ports
        \\  port-who :3000               Details for port 3000
        \\  port-who :3000-4000          Ports in range 3000-4000
        \\  port-who :3000,8080,5432     Specific ports only
        \\  port-who --group             Group by process
        \\  port-who kill :8080          Kill process on port 8080
        \\  port-who watch               Live monitoring
        \\  port-who --sort uptime --all
        \\
    );
}

pub const version = @import("build_zig_zon").version;

pub fn printVersion(writer: anytype) !void {
    try writer.print("port-who v{s}\n", .{version});
}

// =============================================================================
// Inline tests
// =============================================================================

test "parsePort - valid ports" {
    try std.testing.expectEqual(@as(?u16, 3000), parsePort(":3000"));
    try std.testing.expectEqual(@as(?u16, 3000), parsePort("3000"));
    try std.testing.expectEqual(@as(?u16, 80), parsePort(":80"));
    try std.testing.expectEqual(@as(?u16, 80), parsePort("80"));
    try std.testing.expectEqual(@as(?u16, 0), parsePort("0"));
    try std.testing.expectEqual(@as(?u16, 65535), parsePort("65535"));
}

test "parsePort - invalid" {
    try std.testing.expectEqual(@as(?u16, null), parsePort(""));
    try std.testing.expectEqual(@as(?u16, null), parsePort(":"));
    try std.testing.expectEqual(@as(?u16, null), parsePort("abc"));
    try std.testing.expectEqual(@as(?u16, null), parsePort(":abc"));
    try std.testing.expectEqual(@as(?u16, null), parsePort("99999"));
}

test "parseArgs - empty = list" {
    const args = [_][]const u8{};
    const cmd = parseArgs(&args);
    switch (cmd) {
        .list => |opts| {
            try std.testing.expect(!opts.show_all);
            try std.testing.expect(!opts.json);
            try std.testing.expectEqual(SortBy.port, opts.sort_by);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - help" {
    const args1 = [_][]const u8{"--help"};
    switch (parseArgs(&args1)) {
        .help => {},
        else => return error.TestUnexpectedResult,
    }

    const args2 = [_][]const u8{"-h"};
    switch (parseArgs(&args2)) {
        .help => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - version" {
    const args1 = [_][]const u8{"--version"};
    switch (parseArgs(&args1)) {
        .version => {},
        else => return error.TestUnexpectedResult,
    }

    const args2 = [_][]const u8{"-v"};
    switch (parseArgs(&args2)) {
        .version => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - detail port" {
    const args1 = [_][]const u8{":3000"};
    switch (parseArgs(&args1)) {
        .detail => |port| try std.testing.expectEqual(@as(u16, 3000), port),
        else => return error.TestUnexpectedResult,
    }

    const args2 = [_][]const u8{"8080"};
    switch (parseArgs(&args2)) {
        .detail => |port| try std.testing.expectEqual(@as(u16, 8080), port),
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - kill" {
    const args1 = [_][]const u8{ "kill", ":3000" };
    switch (parseArgs(&args1)) {
        .kill => |port| try std.testing.expectEqual(@as(u16, 3000), port),
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - kill no port" {
    const args1 = [_][]const u8{"kill"};
    switch (parseArgs(&args1)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - list with options" {
    const args1 = [_][]const u8{ "--all", "--json", "--sort", "uptime" };
    switch (parseArgs(&args1)) {
        .list => |opts| {
            try std.testing.expect(opts.show_all);
            try std.testing.expect(opts.json);
            try std.testing.expectEqual(SortBy.uptime, opts.sort_by);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - sort without value" {
    const args1 = [_][]const u8{"--sort"};
    switch (parseArgs(&args1)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - invalid sort value" {
    const args1 = [_][]const u8{ "--sort", "invalid" };
    switch (parseArgs(&args1)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - unknown argument" {
    const args1 = [_][]const u8{"foobar"};
    switch (parseArgs(&args1)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - short flags" {
    const args1 = [_][]const u8{ "-a", "-j", "-s", "memory" };
    switch (parseArgs(&args1)) {
        .list => |opts| {
            try std.testing.expect(opts.show_all);
            try std.testing.expect(opts.json);
            try std.testing.expectEqual(SortBy.memory, opts.sort_by);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - watch command" {
    const args1 = [_][]const u8{"watch"};
    switch (parseArgs(&args1)) {
        .watch => |opts| {
            try std.testing.expect(!opts.show_all);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - watch with --all" {
    const args1 = [_][]const u8{ "watch", "--all" };
    switch (parseArgs(&args1)) {
        .watch => |opts| {
            try std.testing.expect(opts.show_all);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - group flag" {
    const args1 = [_][]const u8{"--group"};
    switch (parseArgs(&args1)) {
        .list => |opts| {
            try std.testing.expect(opts.group);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - port range" {
    const args1 = [_][]const u8{":3000-4000"};
    switch (parseArgs(&args1)) {
        .list => |opts| {
            switch (opts.port_filter) {
                .range => |r| {
                    try std.testing.expectEqual(@as(u16, 3000), r.min);
                    try std.testing.expectEqual(@as(u16, 4000), r.max);
                },
                else => return error.TestUnexpectedResult,
            }
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - port list" {
    const args1 = [_][]const u8{":3000,8080,5432"};
    switch (parseArgs(&args1)) {
        .list => |opts| {
            switch (opts.port_filter) {
                .list => |ports| {
                    try std.testing.expectEqual(@as(usize, 3), ports.len);
                    try std.testing.expectEqual(@as(u16, 3000), ports[0]);
                    try std.testing.expectEqual(@as(u16, 8080), ports[1]);
                    try std.testing.expectEqual(@as(u16, 5432), ports[2]);
                },
                else => return error.TestUnexpectedResult,
            }
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parsePortRange - valid" {
    {
        const result = parsePortRange(":3000-4000");
        try std.testing.expect(result != null);
        try std.testing.expectEqual(@as(u16, 3000), result.?.min);
        try std.testing.expectEqual(@as(u16, 4000), result.?.max);
    }
    {
        const result = parsePortRange("3000-4000");
        try std.testing.expect(result != null);
        try std.testing.expectEqual(@as(u16, 3000), result.?.min);
        try std.testing.expectEqual(@as(u16, 4000), result.?.max);
    }
}

test "parsePortRange - invalid" {
    try std.testing.expect(parsePortRange("3000") == null);
    try std.testing.expect(parsePortRange("") == null);
    try std.testing.expect(parsePortRange("-3000") == null);
    try std.testing.expect(parsePortRange("3000-") == null);
    try std.testing.expect(parsePortRange("5000-3000") == null); // min > max
}

test "parsePortList - valid" {
    {
        const result = parsePortList(":3000,8080,5432");
        try std.testing.expect(result != null);
        try std.testing.expectEqual(@as(usize, 3), result.?.len);
        try std.testing.expectEqual(@as(u16, 3000), result.?[0]);
        try std.testing.expectEqual(@as(u16, 8080), result.?[1]);
        try std.testing.expectEqual(@as(u16, 5432), result.?[2]);
    }
}

test "parsePortList - invalid" {
    try std.testing.expect(parsePortList("3000") == null); // no comma
    try std.testing.expect(parsePortList("") == null);
    try std.testing.expect(parsePortList("abc,def") == null);
}

test "portPassesFilter - none" {
    try std.testing.expect(portPassesFilter(3000, .{ .none = {} }));
}

test "portPassesFilter - single" {
    try std.testing.expect(portPassesFilter(3000, .{ .single = 3000 }));
    try std.testing.expect(!portPassesFilter(8080, .{ .single = 3000 }));
}

test "portPassesFilter - range" {
    const filter = PortFilter{ .range = .{ .min = 3000, .max = 4000 } };
    try std.testing.expect(portPassesFilter(3000, filter));
    try std.testing.expect(portPassesFilter(3500, filter));
    try std.testing.expect(portPassesFilter(4000, filter));
    try std.testing.expect(!portPassesFilter(2999, filter));
    try std.testing.expect(!portPassesFilter(4001, filter));
}

test "portPassesFilter - list" {
    const ports = [_]u16{ 3000, 8080, 5432 };
    const filter = PortFilter{ .list = &ports };
    try std.testing.expect(portPassesFilter(3000, filter));
    try std.testing.expect(portPassesFilter(8080, filter));
    try std.testing.expect(portPassesFilter(5432, filter));
    try std.testing.expect(!portPassesFilter(9999, filter));
}
