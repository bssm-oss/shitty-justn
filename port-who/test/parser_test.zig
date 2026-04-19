const std = @import("std");
const darwin_collector = @import("darwin_collector");
const port_info = @import("port_info");

test "parse basic fixture" {
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
        \\p5678
        \\cpostgres
        \\f10
        \\tIPv4
        \\PTCP
        \\n*:5432
        \\TST=LISTEN
    ;

    var results = try darwin_collector.parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 3), results.items.len);

    try std.testing.expectEqual(@as(u16, 50796), results.items[0].port);
    try std.testing.expectEqualStrings("rapportd", results.items[0].process_name);
    try std.testing.expectEqual(@as(u32, 599), results.items[0].pid);

    try std.testing.expectEqual(@as(u16, 3000), results.items[1].port);
    try std.testing.expectEqualStrings("node", results.items[1].process_name);
    try std.testing.expectEqualStrings("127.0.0.1", results.items[1].bind_address);

    try std.testing.expectEqual(@as(u16, 5432), results.items[2].port);
    try std.testing.expectEqualStrings("postgres", results.items[2].process_name);
}

test "parse complex fixture with deduplication" {
    const allocator = std.testing.allocator;
    const input =
        \\p100
        \\cpostgres
        \\f10
        \\tIPv4
        \\PTCP
        \\n*:5432
        \\TST=LISTEN
        \\f11
        \\tIPv6
        \\PTCP
        \\n[::]:5432
        \\TST=LISTEN
        \\p200
        \\cnode
        \\f20
        \\tIPv4
        \\PTCP
        \\n*:3000
        \\TST=LISTEN
        \\f21
        \\tIPv6
        \\PTCP
        \\n[::]:3000
        \\TST=LISTEN
        \\f22
        \\tIPv4
        \\PTCP
        \\n127.0.0.1:3001
        \\TST=LISTEN
        \\p300
        \\cjava
        \\f30
        \\tIPv4
        \\PTCP
        \\n*:8080
        \\TST=LISTEN
        \\p400
        \\cnginx
        \\f40
        \\tIPv4
        \\PTCP
        \\n*:80
        \\TST=LISTEN
        \\f41
        \\tIPv4
        \\PTCP
        \\n*:443
        \\TST=LISTEN
        \\p9999
        \\c
        \\f50
        \\tIPv4
        \\PTCP
        \\n*:8888
        \\TST=LISTEN
    ;

    var results = try darwin_collector.parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    // postgres(5432), node(3000), node(3001), java(8080), nginx(80), nginx(443), ???(8888)
    try std.testing.expectEqual(@as(usize, 7), results.items.len);

    var count_5432: usize = 0;
    var count_3000: usize = 0;
    for (results.items) |item| {
        if (item.port == 5432) count_5432 += 1;
        if (item.port == 3000) count_3000 += 1;
    }
    try std.testing.expectEqual(@as(usize, 1), count_5432);
    try std.testing.expectEqual(@as(usize, 1), count_3000);

    var found_unknown = false;
    for (results.items) |item| {
        if (item.port == 8888) {
            found_unknown = true;
            try std.testing.expect(!item.is_identified);
            try std.testing.expectEqualStrings("???", item.process_name);
        }
    }
    try std.testing.expect(found_unknown);
}

test "parse empty input" {
    const allocator = std.testing.allocator;
    var results = try darwin_collector.parseLsofOutput(allocator, "");
    defer results.deinit(allocator);
    try std.testing.expectEqual(@as(usize, 0), results.items.len);
}

test "parse single process multiple ports" {
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

    var results = try darwin_collector.parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 2), results.items.len);
    try std.testing.expectEqual(@as(u16, 80), results.items[0].port);
    try std.testing.expectEqual(@as(u16, 443), results.items[1].port);
    try std.testing.expectEqual(@as(u32, 500), results.items[0].pid);
    try std.testing.expectEqual(@as(u32, 500), results.items[1].pid);
}

test "parseNameField variants" {
    {
        const r = darwin_collector.parseNameField("*:3000");
        try std.testing.expectEqualStrings("*", r.addr);
        try std.testing.expectEqual(@as(?u16, 3000), r.port);
    }
    {
        const r = darwin_collector.parseNameField("127.0.0.1:8080");
        try std.testing.expectEqualStrings("127.0.0.1", r.addr);
        try std.testing.expectEqual(@as(?u16, 8080), r.port);
    }
    {
        const r = darwin_collector.parseNameField("[::1]:5432");
        try std.testing.expectEqualStrings("[::1]", r.addr);
        try std.testing.expectEqual(@as(?u16, 5432), r.port);
    }
    {
        const r = darwin_collector.parseNameField("[::]:3000");
        try std.testing.expectEqualStrings("[::]", r.addr);
        try std.testing.expectEqual(@as(?u16, 3000), r.port);
    }
    {
        const r = darwin_collector.parseNameField("somehost");
        try std.testing.expectEqualStrings("somehost", r.addr);
        try std.testing.expect(r.port == null);
    }
    {
        const r = darwin_collector.parseNameField("host:abc");
        try std.testing.expectEqualStrings("host", r.addr);
        try std.testing.expect(r.port == null);
    }
}

test "state parsing in lsof output" {
    const allocator = std.testing.allocator;
    const input =
        \\p100
        \\cnode
        \\f10
        \\PTCP
        \\n*:3000
        \\TST=ESTABLISHED
    ;

    var results = try darwin_collector.parseLsofOutput(allocator, input);
    defer {
        for (results.items) |*item| item.deinit();
        results.deinit(allocator);
    }

    try std.testing.expectEqual(@as(usize, 1), results.items.len);
    try std.testing.expectEqual(port_info.State.established, results.items[0].state);
}
