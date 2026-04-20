import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

function createDb() {
  const url = process.env.TURSO_DB_URL;
  if (!url) throw new Error('TURSO_DB_URL 환경변수가 설정되지 않았습니다.');

  const turso = createClient({
    url,
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  });
  return drizzle(turso, { schema });
}

// lazy 초기화 — 빌드 시 DB 연결 방지
let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}
