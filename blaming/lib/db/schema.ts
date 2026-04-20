import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const analysisResults = sqliteTable(
  'analysis_results',
  {
    id: text('id').primaryKey(),
    url: text('url').notNull(),
    result_data: text('result_data').notNull(), // JSON string
    created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [index('url_idx').on(table.url)],
);

export const rateLimits = sqliteTable('rate_limits', {
  ip: text('ip').primaryKey(),
  count: integer('count').notNull().default(0),
  reset_at: integer('reset_at', { mode: 'timestamp' }).notNull(),
});