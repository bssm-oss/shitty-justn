const std = @import("std");
const builtin = @import("builtin");
const port_info = @import("port_info");
const PortInfo = port_info.PortInfo;

pub const darwin = @import("darwin_process");

/// Enrich PortInfo entries with supplementary process data (CWD, memory, start time).
pub fn enrichPortInfos(allocator: std.mem.Allocator, infos: []PortInfo) void {
    if (comptime builtin.os.tag == .macos) {
        darwin.enrichPortInfos(allocator, infos);
    } else {
        @compileError("port-who currently supports macOS only.");
    }
}
