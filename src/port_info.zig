const std = @import("std");

pub const Protocol = enum {
    tcp,
    udp,

    pub fn toString(self: Protocol) []const u8 {
        return switch (self) {
            .tcp => "TCP",
            .udp => "UDP",
        };
    }
};

pub const State = enum {
    listen,
    established,
    close_wait,
    time_wait,
    unknown,

    pub fn toString(self: State) []const u8 {
        return switch (self) {
            .listen => "LISTEN",
            .established => "ESTABLISHED",
            .close_wait => "CLOSE_WAIT",
            .time_wait => "TIME_WAIT",
            .unknown => "UNKNOWN",
        };
    }

    pub fn fromString(s: []const u8) State {
        if (std.mem.eql(u8, s, "LISTEN")) return .listen;
        if (std.mem.eql(u8, s, "ESTABLISHED")) return .established;
        if (std.mem.eql(u8, s, "CLOSE_WAIT")) return .close_wait;
        if (std.mem.eql(u8, s, "TIME_WAIT")) return .time_wait;
        return .unknown;
    }
};

pub const PortInfo = struct {
    port: u16,
    protocol: Protocol,
    process_name: []const u8,
    pid: u32,
    command: []const u8,
    cwd: ?[]const u8,
    project_name: ?[]const u8,
    start_time: ?i64,
    memory_rss: ?u64,
    state: State,
    bind_address: []const u8,
    is_identified: bool,
    allocator: std.mem.Allocator,

    pub fn deinit(self: *PortInfo) void {
        self.allocator.free(self.process_name);
        self.allocator.free(self.command);
        if (self.cwd) |cwd| self.allocator.free(cwd);
        if (self.project_name) |pn| self.allocator.free(pn);
        self.allocator.free(self.bind_address);
    }

    pub fn isUnknown(self: *const PortInfo) bool {
        return !self.is_identified;
    }

    /// Compare two PortInfo by port number
    pub fn compareByPort(_: void, a: PortInfo, b: PortInfo) bool {
        return a.port < b.port;
    }

    /// Compare by uptime (longest first)
    pub fn compareByUptime(_: void, a: PortInfo, b: PortInfo) bool {
        const a_time = a.start_time orelse std.math.maxInt(i64);
        const b_time = b.start_time orelse std.math.maxInt(i64);
        return a_time < b_time; // smaller start_time = older = longer uptime
    }

    /// Compare by memory (largest first)
    pub fn compareByMemory(_: void, a: PortInfo, b: PortInfo) bool {
        const a_mem = a.memory_rss orelse 0;
        const b_mem = b.memory_rss orelse 0;
        return a_mem > b_mem;
    }
};

// =============================================================================
// Inline tests
// =============================================================================

test "Protocol.toString" {
    try std.testing.expectEqualStrings("TCP", Protocol.tcp.toString());
    try std.testing.expectEqualStrings("UDP", Protocol.udp.toString());
}

test "State.fromString" {
    try std.testing.expectEqual(State.listen, State.fromString("LISTEN"));
    try std.testing.expectEqual(State.established, State.fromString("ESTABLISHED"));
    try std.testing.expectEqual(State.close_wait, State.fromString("CLOSE_WAIT"));
    try std.testing.expectEqual(State.time_wait, State.fromString("TIME_WAIT"));
    try std.testing.expectEqual(State.unknown, State.fromString("SOMETHING_ELSE"));
}

test "State.toString" {
    try std.testing.expectEqualStrings("LISTEN", State.listen.toString());
    try std.testing.expectEqualStrings("ESTABLISHED", State.established.toString());
    try std.testing.expectEqualStrings("UNKNOWN", State.unknown.toString());
}

test "PortInfo.isUnknown" {
    const allocator = std.testing.allocator;
    var info = PortInfo{
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
    defer info.deinit();
    try std.testing.expect(!info.isUnknown());

    var info2 = PortInfo{
        .port = 8080,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "???"),
        .pid = 9999,
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
    defer info2.deinit();
    try std.testing.expect(info2.isUnknown());
}

test "PortInfo.compareByPort" {
    const allocator = std.testing.allocator;
    var a = PortInfo{
        .port = 3000,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "a"),
        .pid = 1,
        .command = try allocator.dupe(u8, "a"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer a.deinit();

    var b = PortInfo{
        .port = 8080,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "b"),
        .pid = 2,
        .command = try allocator.dupe(u8, "b"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = null,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer b.deinit();

    try std.testing.expect(PortInfo.compareByPort({}, a, b));
    try std.testing.expect(!PortInfo.compareByPort({}, b, a));
}

test "PortInfo.compareByMemory" {
    const allocator = std.testing.allocator;
    var a = PortInfo{
        .port = 3000,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "a"),
        .pid = 1,
        .command = try allocator.dupe(u8, "a"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = 1024 * 1024,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer a.deinit();

    var b = PortInfo{
        .port = 8080,
        .protocol = .tcp,
        .process_name = try allocator.dupe(u8, "b"),
        .pid = 2,
        .command = try allocator.dupe(u8, "b"),
        .cwd = null,
        .project_name = null,
        .start_time = null,
        .memory_rss = 512 * 1024,
        .state = .listen,
        .bind_address = try allocator.dupe(u8, "*"),
        .is_identified = true,
        .allocator = allocator,
    };
    defer b.deinit();

    try std.testing.expect(PortInfo.compareByMemory({}, a, b));
    try std.testing.expect(!PortInfo.compareByMemory({}, b, a));
}
