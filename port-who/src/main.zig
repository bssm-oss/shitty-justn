const std = @import("std");
const cli = @import("cli");
const port_info_mod = @import("port_info");
const PortInfo = port_info_mod.PortInfo;
const collector = @import("collector");
const process_mod = @import("process");
const formatter = @import("formatter");
const detail = @import("detail");
const color = @import("color");
const grouped = @import("grouped");
const watch_mod = @import("watch");
const docker = @import("docker");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // Parse CLI args
    var args_iter = try std.process.argsWithAllocator(allocator);
    defer args_iter.deinit();

    // Skip argv[0]
    _ = args_iter.next();

    var args_list: std.ArrayListUnmanaged([]const u8) = .{};
    defer args_list.deinit(allocator);

    while (args_iter.next()) |arg| {
        try args_list.append(allocator, arg);
    }

    const command = cli.parseArgs(args_list.items);
    const cc = color.ColorConfig.init();

    switch (command) {
        .help => {
            var out_buf: [4096]u8 = undefined;
            var out = std.fs.File.stdout().writer(&out_buf);
            try cli.printHelp(&out.interface);
            try out.interface.flush();
        },
        .version => {
            var out_buf: [256]u8 = undefined;
            var out = std.fs.File.stdout().writer(&out_buf);
            try cli.printVersion(&out.interface);
            try out.interface.flush();
        },
        .err => |msg| {
            var err_buf: [4096]u8 = undefined;
            var err_w = std.fs.File.stderr().writer(&err_buf);
            const stderr = &err_w.interface;
            try cc.write(stderr, .bold_red, "Error:");
            try stderr.print("{s}\n", .{msg});
            try stderr.writeAll("Help: port-who --help\n");
            try stderr.flush();
            std.process.exit(1);
        },
        .list => |opts| {
            try runList(allocator, opts, cc);
        },
        .detail => |port| {
            try runDetail(allocator, port, cc);
        },
        .kill => |port| {
            try runKill(allocator, port, cc);
        },
        .watch => |opts| {
            try watch_mod.runWatch(allocator, opts.show_all, cc);
        },
    }
}

fn runList(allocator: std.mem.Allocator, opts: cli.ListOptions, cc: color.ColorConfig) !void {
    var infos = collector.collectPorts(allocator, opts.show_all) catch |err| {
        var err_buf: [4096]u8 = undefined;
        var err_w = std.fs.File.stderr().writer(&err_buf);
        const stderr = &err_w.interface;
        try cc.write(stderr, .bold_red, "Error:");
        try stderr.print("Failed to get port info: {}\n", .{err});
        try stderr.flush();
        return;
    };
    defer {
        for (infos.items) |*item| item.deinit();
        infos.deinit(allocator);
    }

    // Enrich with process info
    process_mod.enrichPortInfos(allocator, infos.items);

    // Enrich Docker containers
    docker.enrichWithDocker(allocator, infos.items);

    // Apply port filter
    switch (opts.port_filter) {
        .none => {},
        else => {
            // Remove entries that don't match the filter
            var write_idx: usize = 0;
            for (infos.items) |*item| {
                if (cli.portPassesFilter(item.port, opts.port_filter)) {
                    if (write_idx != (@intFromPtr(item) - @intFromPtr(infos.items.ptr)) / @sizeOf(PortInfo)) {
                        infos.items[write_idx] = item.*;
                    }
                    write_idx += 1;
                } else {
                    item.deinit();
                }
            }
            infos.items.len = write_idx;
        },
    }

    // Sort
    switch (opts.sort_by) {
        .port => std.mem.sort(PortInfo, infos.items, {}, PortInfo.compareByPort),
        .uptime => std.mem.sort(PortInfo, infos.items, {}, PortInfo.compareByUptime),
        .memory => std.mem.sort(PortInfo, infos.items, {}, PortInfo.compareByMemory),
    }

    // Output
    if (opts.json) {
        try formatter.printJson(allocator, infos.items);
    } else if (opts.group) {
        try grouped.printGrouped(infos.items, cc);
    } else {
        try formatter.printTable(infos.items, cc);
    }
}

fn runDetail(allocator: std.mem.Allocator, port: u16, cc: color.ColorConfig) !void {
    var infos = collector.collectPorts(allocator, true) catch |err| {
        var err_buf: [4096]u8 = undefined;
        var err_w = std.fs.File.stderr().writer(&err_buf);
        const stderr = &err_w.interface;
        try cc.write(stderr, .bold_red, "Error:");
        try stderr.print("Failed to get port info: {}\n", .{err});
        try stderr.flush();
        return;
    };
    defer {
        for (infos.items) |*item| item.deinit();
        infos.deinit(allocator);
    }

    var found: ?*PortInfo = null;
    for (infos.items) |*info| {
        if (info.port == port) {
            found = info;
            break;
        }
    }

    if (found) |info| {
        var single = [_]PortInfo{info.*};
        process_mod.enrichPortInfos(allocator, &single);
        info.* = single[0];

        try detail.printDetail(info, cc);
    } else {
        var err_buf: [4096]u8 = undefined;
        var err_w = std.fs.File.stderr().writer(&err_buf);
        const stderr = &err_w.interface;
        try cc.write(stderr, .bold_yellow, "Notice:");
        try stderr.print("No process is using port :{d}.\n", .{port});
        try stderr.flush();
    }
}

fn runKill(allocator: std.mem.Allocator, port: u16, cc: color.ColorConfig) !void {
    var infos = collector.collectPorts(allocator, true) catch |err| {
        var err_buf: [4096]u8 = undefined;
        var err_w = std.fs.File.stderr().writer(&err_buf);
        const stderr = &err_w.interface;
        try cc.write(stderr, .bold_red, "Error:");
        try stderr.print("Failed to get port info: {}\n", .{err});
        try stderr.flush();
        return;
    };
    defer {
        for (infos.items) |*item| item.deinit();
        infos.deinit(allocator);
    }

    var found: ?*PortInfo = null;
    for (infos.items) |*info| {
        if (info.port == port) {
            found = info;
            break;
        }
    }

    if (found) |info| {
        var out_buf: [4096]u8 = undefined;
        var out = std.fs.File.stdout().writer(&out_buf);
        const stdout = &out.interface;

        try cc.writeCode(stdout, .bold_yellow);
        if (info.is_identified) {
            try stdout.print(":{d} ({s}, PID:{d}) ", .{ info.port, info.process_name, info.pid });
        } else {
            try stdout.print(":{d} (PID:{d}) ", .{ info.port, info.pid });
        }
        try cc.writeReset(stdout);
        try stdout.writeAll("Kill this process? (y/n) ");
        try stdout.flush();

        // Read user response from stdin
        var in_buf: [256]u8 = undefined;
        var in_r = std.fs.File.stdin().reader(&in_buf);
        const response = in_r.interface.takeDelimiter('\n') catch null;

        if (response) |resp| {
            const trimmed = std.mem.trim(u8, resp, " \t\r");
            if (std.mem.eql(u8, trimmed, "y") or std.mem.eql(u8, trimmed, "Y") or
                std.mem.eql(u8, trimmed, "yes"))
            {
                const pid: std.posix.pid_t = @intCast(info.pid);
                std.posix.kill(pid, 15) catch |err| { // SIGTERM = 15
                    var err_buf: [4096]u8 = undefined;
                    var err_w = std.fs.File.stderr().writer(&err_buf);
                    const stderr = &err_w.interface;
                    try cc.write(stderr, .bold_red, "Error:");
                    try stderr.print("Failed to kill process: {}\n", .{err});
                    try stderr.flush();
                    return;
                };

                try cc.write(stdout, .bold_green, "\xe2\x9c\x93 ");
                if (info.is_identified) {
                    try stdout.print("{s} (PID:{d}) terminated\n", .{ info.process_name, info.pid });
                } else {
                    try stdout.print("PID:{d} terminated\n", .{info.pid});
                }
                try stdout.flush();
            } else {
                try stdout.writeAll("Cancelled\n");
                try stdout.flush();
            }
        }
    } else {
        var err_buf: [4096]u8 = undefined;
        var err_w = std.fs.File.stderr().writer(&err_buf);
        const stderr = &err_w.interface;
        try cc.write(stderr, .bold_yellow, "Notice:");
        try stderr.print("No process is using port :{d}.\n", .{port});
        try stderr.flush();
    }
}
