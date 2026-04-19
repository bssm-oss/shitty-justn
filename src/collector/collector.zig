const std = @import("std");
const builtin = @import("builtin");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;

pub const darwin = @import("darwin_collector");

/// Collect all open port information from the OS.
pub fn collectPorts(allocator: std.mem.Allocator, include_all: bool) !std.ArrayListUnmanaged(PortInfo) {
    if (comptime builtin.os.tag == .macos) {
        return darwin.collectPorts(allocator, include_all);
    } else {
        @compileError("port-who currently supports macOS only. Linux support is planned.");
    }
}
