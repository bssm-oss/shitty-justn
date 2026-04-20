CREATE TABLE `analysis_results` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`result_data` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`ip` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`reset_at` integer NOT NULL
);
