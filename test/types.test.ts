import { describe, it, expect } from 'vitest';
import { CliOptionsSchema } from '../src/types.js';

const base = {
  url: 'https://www.notion.so/my-page',
  out: 'out.pdf',
  format: 'A4',
  margin: '18mm,16mm,18mm,16mm',
  profile: 'notion-default',
  cleanLevel: 'soft',
  waitMs: 1200,
  timeoutMs: 45000,
  keepUi: false,
  codeWrap: 'soft',
  codeFontSize: 11,
  noSandbox: false,
  verbose: false,
};

describe('CliOptionsSchema', () => {
  it('accepts notion.so url', () => {
    const result = CliOptionsSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it('accepts notion.site url', () => {
    const result = CliOptionsSchema.safeParse({
      ...base,
      url: 'https://example.notion.site/my-page',
    });
    expect(result.success).toBe(true);
  });

  it('rejects non-Notion url', () => {
    const result = CliOptionsSchema.safeParse({
      ...base,
      url: 'https://example.com/page',
    });
    expect(result.success).toBe(false);
  });

  it('rejects too small timeout', () => {
    const result = CliOptionsSchema.safeParse({
      ...base,
      timeoutMs: 999,
    });
    expect(result.success).toBe(false);
  });

  it('rejects out-of-range code font size', () => {
    const result = CliOptionsSchema.safeParse({
      ...base,
      codeFontSize: 17,
    });
    expect(result.success).toBe(false);
  });
});
