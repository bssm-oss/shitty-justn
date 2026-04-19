const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Define all source modules with proper dependency wiring
    const port_info_mod = b.createModule(.{
        .root_source_file = b.path("src/port_info.zig"),
        .target = target,
        .optimize = optimize,
    });

    const cli_mod = b.createModule(.{
        .root_source_file = b.path("src/cli.zig"),
        .target = target,
        .optimize = optimize,
    });
    cli_mod.addAnonymousImport("build_zig_zon", .{
        .root_source_file = b.path("build.zig.zon"),
    });

    const time_util_mod = b.createModule(.{
        .root_source_file = b.path("src/util/time.zig"),
        .target = target,
        .optimize = optimize,
    });

    const project_util_mod = b.createModule(.{
        .root_source_file = b.path("src/util/project.zig"),
        .target = target,
        .optimize = optimize,
    });

    const color_mod = b.createModule(.{
        .root_source_file = b.path("src/display/color.zig"),
        .target = target,
        .optimize = optimize,
    });

    const icons_mod = b.createModule(.{
        .root_source_file = b.path("src/display/icons.zig"),
        .target = target,
        .optimize = optimize,
    });

    const docker_mod = b.createModule(.{
        .root_source_file = b.path("src/docker.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
        },
    });

    const darwin_collector_mod = b.createModule(.{
        .root_source_file = b.path("src/collector/darwin.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
        },
    });

    const darwin_process_mod = b.createModule(.{
        .root_source_file = b.path("src/process/darwin.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "project_util", .module = project_util_mod },
        },
    });

    const formatter_mod = b.createModule(.{
        .root_source_file = b.path("src/display/formatter.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "color", .module = color_mod },
            .{ .name = "time_util", .module = time_util_mod },
            .{ .name = "icons", .module = icons_mod },
        },
    });

    const detail_mod = b.createModule(.{
        .root_source_file = b.path("src/display/detail.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "color", .module = color_mod },
            .{ .name = "time_util", .module = time_util_mod },
        },
    });

    const grouped_mod = b.createModule(.{
        .root_source_file = b.path("src/display/grouped.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "color", .module = color_mod },
            .{ .name = "time_util", .module = time_util_mod },
            .{ .name = "icons", .module = icons_mod },
        },
    });

    const collector_mod = b.createModule(.{
        .root_source_file = b.path("src/collector/collector.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "darwin_collector", .module = darwin_collector_mod },
        },
    });

    const process_mod = b.createModule(.{
        .root_source_file = b.path("src/process/process.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "darwin_process", .module = darwin_process_mod },
        },
    });

    const watch_mod = b.createModule(.{
        .root_source_file = b.path("src/watch.zig"),
        .target = target,
        .optimize = optimize,
        .imports = &.{
            .{ .name = "port_info", .module = port_info_mod },
            .{ .name = "collector", .module = collector_mod },
            .{ .name = "process", .module = process_mod },
            .{ .name = "color", .module = color_mod },
            .{ .name = "time_util", .module = time_util_mod },
            .{ .name = "icons", .module = icons_mod },
        },
    });

    // Main executable
    const exe = b.addExecutable(.{
        .name = "port-who",
        .root_module = b.createModule(.{
            .root_source_file = b.path("src/main.zig"),
            .target = target,
            .optimize = optimize,
            .imports = &.{
                .{ .name = "cli", .module = cli_mod },
                .{ .name = "port_info", .module = port_info_mod },
                .{ .name = "collector", .module = collector_mod },
                .{ .name = "process", .module = process_mod },
                .{ .name = "formatter", .module = formatter_mod },
                .{ .name = "detail", .module = detail_mod },
                .{ .name = "color", .module = color_mod },
                .{ .name = "grouped", .module = grouped_mod },
                .{ .name = "watch", .module = watch_mod },
                .{ .name = "docker", .module = docker_mod },
            },
        }),
    });
    b.installArtifact(exe);

    // Run step
    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| run_cmd.addArgs(args);
    const run_step = b.step("run", "Run port-who");
    run_step.dependOn(&run_cmd.step);

    // Tests
    const test_step = b.step("test", "Run unit tests");

    // Inline tests for leaf modules (no cross-module imports)
    const leaf_test_files = [_]struct { path: []const u8, mod: *std.Build.Module }{
        .{ .path = "src/port_info.zig", .mod = port_info_mod },
        .{ .path = "src/cli.zig", .mod = cli_mod },
        .{ .path = "src/util/time.zig", .mod = time_util_mod },
        .{ .path = "src/util/project.zig", .mod = project_util_mod },
        .{ .path = "src/display/color.zig", .mod = color_mod },
    };
    for (leaf_test_files) |entry| {
        _ = entry;
    }

    // For inline tests, test the modules directly
    const inline_test_modules = [_]*std.Build.Module{
        port_info_mod,
        cli_mod,
        time_util_mod,
        project_util_mod,
        color_mod,
        icons_mod,
        docker_mod,
        darwin_collector_mod,
        formatter_mod,
        detail_mod,
        grouped_mod,
        darwin_process_mod,
    };
    for (inline_test_modules) |mod| {
        const t = b.addTest(.{ .root_module = mod });
        test_step.dependOn(&b.addRunArtifact(t).step);
    }

    // Dedicated test files
    const test_files = [_][]const u8{
        "test/parser_test.zig",
        "test/time_test.zig",
        "test/project_test.zig",
        "test/cli_test.zig",
    };
    for (test_files) |test_file| {
        const test_mod_inner = b.createModule(.{
            .root_source_file = b.path(test_file),
            .target = target,
            .optimize = optimize,
            .imports = &.{
                .{ .name = "port_info", .module = port_info_mod },
                .{ .name = "cli", .module = cli_mod },
                .{ .name = "darwin_collector", .module = darwin_collector_mod },
                .{ .name = "formatter", .module = formatter_mod },
                .{ .name = "color", .module = color_mod },
                .{ .name = "detail", .module = detail_mod },
                .{ .name = "time_util", .module = time_util_mod },
                .{ .name = "project_util", .module = project_util_mod },
                .{ .name = "darwin_process", .module = darwin_process_mod },
                .{ .name = "icons", .module = icons_mod },
                .{ .name = "docker", .module = docker_mod },
                .{ .name = "grouped", .module = grouped_mod },
            },
        });
        const t = b.addTest(.{ .root_module = test_mod_inner });
        test_step.dependOn(&b.addRunArtifact(t).step);
    }
}
