const std = @import("std");
const cli = @import("cli");

test "parsePort - colon prefix" {
    try std.testing.expectEqual(@as(?u16, 3000), cli.parsePort(":3000"));
    try std.testing.expectEqual(@as(?u16, 80), cli.parsePort(":80"));
    try std.testing.expectEqual(@as(?u16, 443), cli.parsePort(":443"));
    try std.testing.expectEqual(@as(?u16, 8080), cli.parsePort(":8080"));
}

test "parsePort - no prefix" {
    try std.testing.expectEqual(@as(?u16, 3000), cli.parsePort("3000"));
    try std.testing.expectEqual(@as(?u16, 80), cli.parsePort("80"));
    try std.testing.expectEqual(@as(?u16, 65535), cli.parsePort("65535"));
    try std.testing.expectEqual(@as(?u16, 0), cli.parsePort("0"));
}

test "parsePort - invalid" {
    try std.testing.expectEqual(@as(?u16, null), cli.parsePort(""));
    try std.testing.expectEqual(@as(?u16, null), cli.parsePort(":"));
    try std.testing.expectEqual(@as(?u16, null), cli.parsePort("abc"));
    try std.testing.expectEqual(@as(?u16, null), cli.parsePort(":abc"));
    try std.testing.expectEqual(@as(?u16, null), cli.parsePort("99999"));
    try std.testing.expectEqual(@as(?u16, null), cli.parsePort("-1"));
}

test "parseArgs - no args = list with defaults" {
    const args = [_][]const u8{};
    const cmd = cli.parseArgs(&args);
    switch (cmd) {
        .list => |opts| {
            try std.testing.expect(!opts.show_all);
            try std.testing.expect(!opts.json);
            try std.testing.expectEqual(cli.SortBy.port, opts.sort_by);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - help flags" {
    {
        const args = [_][]const u8{"--help"};
        switch (cli.parseArgs(&args)) {
            .help => {},
            else => return error.TestUnexpectedResult,
        }
    }
    {
        const args = [_][]const u8{"-h"};
        switch (cli.parseArgs(&args)) {
            .help => {},
            else => return error.TestUnexpectedResult,
        }
    }
}

test "parseArgs - version flags" {
    {
        const args = [_][]const u8{"--version"};
        switch (cli.parseArgs(&args)) {
            .version => {},
            else => return error.TestUnexpectedResult,
        }
    }
    {
        const args = [_][]const u8{"-v"};
        switch (cli.parseArgs(&args)) {
            .version => {},
            else => return error.TestUnexpectedResult,
        }
    }
}

test "parseArgs - port detail with colon" {
    const args = [_][]const u8{":3000"};
    switch (cli.parseArgs(&args)) {
        .detail => |port| try std.testing.expectEqual(@as(u16, 3000), port),
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - port detail without colon" {
    const args = [_][]const u8{"8080"};
    switch (cli.parseArgs(&args)) {
        .detail => |port| try std.testing.expectEqual(@as(u16, 8080), port),
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - kill command" {
    const args = [_][]const u8{ "kill", ":3000" };
    switch (cli.parseArgs(&args)) {
        .kill => |port| try std.testing.expectEqual(@as(u16, 3000), port),
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - kill without port = error" {
    const args = [_][]const u8{"kill"};
    switch (cli.parseArgs(&args)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - list flags" {
    {
        const args = [_][]const u8{"--all"};
        switch (cli.parseArgs(&args)) {
            .list => |opts| {
                try std.testing.expect(opts.show_all);
                try std.testing.expect(!opts.json);
            },
            else => return error.TestUnexpectedResult,
        }
    }
    {
        const args = [_][]const u8{"--json"};
        switch (cli.parseArgs(&args)) {
            .list => |opts| {
                try std.testing.expect(!opts.show_all);
                try std.testing.expect(opts.json);
            },
            else => return error.TestUnexpectedResult,
        }
    }
}

test "parseArgs - sort option" {
    {
        const args = [_][]const u8{ "--sort", "port" };
        switch (cli.parseArgs(&args)) {
            .list => |opts| try std.testing.expectEqual(cli.SortBy.port, opts.sort_by),
            else => return error.TestUnexpectedResult,
        }
    }
    {
        const args = [_][]const u8{ "--sort", "uptime" };
        switch (cli.parseArgs(&args)) {
            .list => |opts| try std.testing.expectEqual(cli.SortBy.uptime, opts.sort_by),
            else => return error.TestUnexpectedResult,
        }
    }
    {
        const args = [_][]const u8{ "--sort", "memory" };
        switch (cli.parseArgs(&args)) {
            .list => |opts| try std.testing.expectEqual(cli.SortBy.memory, opts.sort_by),
            else => return error.TestUnexpectedResult,
        }
    }
}

test "parseArgs - sort without value = error" {
    const args = [_][]const u8{"--sort"};
    switch (cli.parseArgs(&args)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - invalid sort value = error" {
    const args = [_][]const u8{ "--sort", "invalid" };
    switch (cli.parseArgs(&args)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - combined flags" {
    const args = [_][]const u8{ "-a", "-j", "-s", "memory" };
    switch (cli.parseArgs(&args)) {
        .list => |opts| {
            try std.testing.expect(opts.show_all);
            try std.testing.expect(opts.json);
            try std.testing.expectEqual(cli.SortBy.memory, opts.sort_by);
        },
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - unknown argument = error" {
    const args = [_][]const u8{"foobar"};
    switch (cli.parseArgs(&args)) {
        .err => {},
        else => return error.TestUnexpectedResult,
    }
}

test "parseArgs - help takes priority even with other args" {
    const args = [_][]const u8{ "--all", "--help" };
    switch (cli.parseArgs(&args)) {
        .help => {},
        else => return error.TestUnexpectedResult,
    }
}

test "SortBy.fromString" {
    try std.testing.expectEqual(@as(?cli.SortBy, .port), cli.SortBy.fromString("port"));
    try std.testing.expectEqual(@as(?cli.SortBy, .uptime), cli.SortBy.fromString("uptime"));
    try std.testing.expectEqual(@as(?cli.SortBy, .memory), cli.SortBy.fromString("memory"));
    try std.testing.expectEqual(@as(?cli.SortBy, null), cli.SortBy.fromString("invalid"));
    try std.testing.expectEqual(@as(?cli.SortBy, null), cli.SortBy.fromString(""));
}

test "printHelp produces output" {
    var buf: [2048]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try cli.printHelp(stream.writer());
    const output = stream.getWritten();
    try std.testing.expect(output.len > 0);
    try std.testing.expect(std.mem.indexOf(u8, output, "port-who") != null);
}

test "printVersion produces output" {
    var buf: [256]u8 = undefined;
    var stream = std.io.fixedBufferStream(&buf);
    try cli.printVersion(stream.writer());
    const output = stream.getWritten();
    try std.testing.expect(std.mem.startsWith(u8, output, "port-who v"));
    try std.testing.expect(std.mem.endsWith(u8, output, "\n"));
}
