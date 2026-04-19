const std = @import("std");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;

/// Docker container info
pub const ContainerInfo = struct {
    id: []const u8,
    name: []const u8,
    /// Maps host_port -> container_port
    host_ports: []u16,
    allocator: std.mem.Allocator,

    pub fn deinit(self: *ContainerInfo) void {
        self.allocator.free(self.id);
        self.allocator.free(self.name);
        self.allocator.free(self.host_ports);
    }
};

/// Check if a process is Docker-related
pub fn isDockerProcess(process_name: []const u8) bool {
    if (std.mem.indexOf(u8, process_name, "docker") != null) return true;
    if (std.mem.indexOf(u8, process_name, "com.docker") != null) return true;
    if (std.mem.indexOf(u8, process_name, "vpnkit") != null) return true;
    return false;
}

/// Try to get Docker container name for a port.
/// Returns allocated string "container-name" or null if not found.
pub fn getContainerNameForPort(allocator: std.mem.Allocator, port: u16) ?[]const u8 {
    const docker_output = runDockerPs(allocator) orelse return null;
    defer allocator.free(docker_output);

    return parseDockerPsForPort(allocator, docker_output, port);
}

/// Parse `docker ps --format` output to find container name for a port
pub fn parseDockerPsForPort(allocator: std.mem.Allocator, output: []const u8, target_port: u16) ?[]const u8 {
    var lines = std.mem.splitScalar(u8, output, '\n');
    while (lines.next()) |line| {
        if (line.len == 0) continue;

        // Format: ID\tNAME\tPORTS
        var fields = std.mem.splitScalar(u8, line, '\t');
        _ = fields.next() orelse continue; // ID
        const name = fields.next() orelse continue; // Name
        const ports_str = fields.next() orelse continue; // Ports

        // Parse ports field: "0.0.0.0:3000->3000/tcp, 0.0.0.0:3001->3001/tcp"
        if (portMatchesDockerPorts(ports_str, target_port)) {
            return allocator.dupe(u8, name) catch null;
        }
    }
    return null;
}

/// Check if a target port is in a Docker ports string
fn portMatchesDockerPorts(ports_str: []const u8, target_port: u16) bool {
    // Ports format: "0.0.0.0:3000->3000/tcp, :::3000->3000/tcp, 5432/tcp"
    var segments = std.mem.splitSequence(u8, ports_str, ", ");
    while (segments.next()) |segment| {
        // Look for "host:port->" pattern
        if (std.mem.indexOf(u8, segment, "->")) |arrow_pos| {
            const before_arrow = segment[0..arrow_pos];
            // Find the last colon before the arrow (host:port)
            if (std.mem.lastIndexOfScalar(u8, before_arrow, ':')) |colon_pos| {
                const port_str = before_arrow[colon_pos + 1 ..];
                const host_port = std.fmt.parseInt(u16, port_str, 10) catch continue;
                if (host_port == target_port) return true;
            }
        }
    }
    return false;
}

fn runDockerPs(allocator: std.mem.Allocator) ?[]const u8 {
    const argv = [_][]const u8{ "docker", "ps", "--format", "{{.ID}}\t{{.Names}}\t{{.Ports}}" };
    var child = std.process.Child.init(&argv, allocator);
    child.stderr_behavior = .Ignore;
    child.stdout_behavior = .Pipe;

    child.spawn() catch return null;

    const stdout_file = child.stdout.?;
    var read_buf: [8192]u8 = undefined;
    var reader_w = stdout_file.reader(&read_buf);
    const output = reader_w.interface.allocRemaining(allocator, .unlimited) catch {
        _ = child.wait() catch {};
        return null;
    };
    const result = child.wait() catch {
        allocator.free(output);
        return null;
    };
    if (result.Exited != 0) {
        allocator.free(output);
        return null;
    }

    return output;
}

/// Enrich port infos with Docker container names
pub fn enrichWithDocker(allocator: std.mem.Allocator, infos: []PortInfo) void {
    // Run docker ps once
    const docker_output = runDockerPs(allocator) orelse return;
    defer allocator.free(docker_output);

    // Build port → container_name map once
    var port_map = std.AutoHashMap(u16, []const u8).init(allocator);
    defer {
        var it = port_map.valueIterator();
        while (it.next()) |name| allocator.free(name.*);
        port_map.deinit();
    }
    buildDockerPortMap(allocator, docker_output, &port_map);

    for (infos) |*info| {
        if (isDockerProcess(info.process_name) or
            (info.project_name != null and std.mem.eql(u8, info.project_name.?, "docker")))
        {
            if (port_map.get(info.port)) |container_name| {
                if (info.project_name) |old| {
                    info.allocator.free(old);
                }
                const prefix = "\xf0\x9f\x90\xb3 "; // 🐳 + space
                const full_name = allocator.alloc(u8, prefix.len + container_name.len) catch continue;
                @memcpy(full_name[0..prefix.len], prefix);
                @memcpy(full_name[prefix.len..], container_name);
                info.project_name = full_name;
            }
        }
    }
}

/// Build a HashMap from docker ps output: host_port → container_name
fn buildDockerPortMap(allocator: std.mem.Allocator, output: []const u8, map: *std.AutoHashMap(u16, []const u8)) void {
    var lines = std.mem.splitScalar(u8, output, '\n');
    while (lines.next()) |line| {
        if (line.len == 0) continue;

        var fields = std.mem.splitScalar(u8, line, '\t');
        _ = fields.next() orelse continue; // ID
        const name = fields.next() orelse continue; // Name
        const ports_str = fields.next() orelse continue; // Ports

        // Parse all ports from this container
        var segments = std.mem.splitSequence(u8, ports_str, ", ");
        while (segments.next()) |segment| {
            if (std.mem.indexOf(u8, segment, "->")) |arrow_pos| {
                const before_arrow = segment[0..arrow_pos];
                if (std.mem.lastIndexOfScalar(u8, before_arrow, ':')) |colon_pos| {
                    const port_str = before_arrow[colon_pos + 1 ..];
                    const host_port = std.fmt.parseInt(u16, port_str, 10) catch continue;
                    if (!map.contains(host_port)) {
                        map.put(host_port, allocator.dupe(u8, name) catch continue) catch continue;
                    }
                }
            }
        }
    }
}

// =============================================================================
// Inline tests
// =============================================================================

test "isDockerProcess" {
    try std.testing.expect(isDockerProcess("com.docker.backend"));
    try std.testing.expect(isDockerProcess("docker-proxy"));
    try std.testing.expect(isDockerProcess("vpnkit-bridge"));
    try std.testing.expect(!isDockerProcess("node"));
    try std.testing.expect(!isDockerProcess("nginx"));
}

test "portMatchesDockerPorts - basic" {
    try std.testing.expect(portMatchesDockerPorts("0.0.0.0:3000->3000/tcp", 3000));
    try std.testing.expect(!portMatchesDockerPorts("0.0.0.0:3000->3000/tcp", 8080));
}

test "portMatchesDockerPorts - multiple ports" {
    try std.testing.expect(portMatchesDockerPorts("0.0.0.0:3000->3000/tcp, 0.0.0.0:3001->3001/tcp", 3001));
    try std.testing.expect(portMatchesDockerPorts("0.0.0.0:3000->3000/tcp, 0.0.0.0:3001->3001/tcp", 3000));
    try std.testing.expect(!portMatchesDockerPorts("0.0.0.0:3000->3000/tcp, 0.0.0.0:3001->3001/tcp", 8080));
}

test "portMatchesDockerPorts - ipv6" {
    try std.testing.expect(portMatchesDockerPorts(":::5432->5432/tcp", 5432));
}

test "parseDockerPsForPort" {
    const allocator = std.testing.allocator;
    const output = "abc123\tmy-postgres\t0.0.0.0:5432->5432/tcp\ndef456\tmy-redis\t0.0.0.0:6379->6379/tcp\n";

    {
        const name = parseDockerPsForPort(allocator, output, 5432);
        defer if (name) |n| allocator.free(n);
        try std.testing.expect(name != null);
        try std.testing.expectEqualStrings("my-postgres", name.?);
    }

    {
        const name = parseDockerPsForPort(allocator, output, 6379);
        defer if (name) |n| allocator.free(n);
        try std.testing.expect(name != null);
        try std.testing.expectEqualStrings("my-redis", name.?);
    }

    {
        const name = parseDockerPsForPort(allocator, output, 9999);
        try std.testing.expect(name == null);
    }
}
