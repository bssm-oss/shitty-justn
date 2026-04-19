import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/profiles/base-light-mode.css', () => ({ default: 'BASE_CSS' }));
vi.mock('../src/profiles/notion-default.css', () => ({ default: 'NOTION_DEFAULT_CSS' }));
vi.mock('../src/profiles/portfolio.css', () => ({ default: 'PORTFOLIO_CSS' }));

import { injectProfileCss } from '../src/notion/injectStyles.js';

describe('injectProfileCss', () => {
  it('injects css and returns composed content', async () => {
    let content = '';
    const page = {
      addStyleTag: async ({ content: css }: { content: string }) => {
        content = css;
      },
    } as any;

    const css = await injectProfileCss(page, 'notion-default', {
      codeWrap: 'soft',
      codeFontSize: 12,
    });

    expect(css).toContain('BASE_CSS');
    expect(css).toContain('NOTION_DEFAULT_CSS');
    expect(css).toContain('word-break: break-word');
    expect(css).toContain('font-size: 12px');
    expect(content).toBe(css);
  });

  it('uses hard wrap style when codeWrap is hard', async () => {
    const page = { addStyleTag: async () => undefined } as any;
    const css = await injectProfileCss(page, 'portfolio', {
      codeWrap: 'hard',
      codeFontSize: 11,
    });
    expect(css).toContain('PORTFOLIO_CSS');
    expect(css).toContain('word-break: break-all');
  });

  it('uses no-wrap style when codeWrap is none', async () => {
    const page = { addStyleTag: async () => undefined } as any;
    const css = await injectProfileCss(page, 'portfolio', {
      codeWrap: 'none',
      codeFontSize: 10,
    });
    expect(css).toContain('white-space: pre !important');
    expect(css).toContain('overflow-x: auto');
  });

  it('throws for unknown profile', async () => {
    const page = { addStyleTag: async () => undefined } as any;
    await expect(injectProfileCss(page, 'unknown' as any)).rejects.toThrow(/Unknown profile/i);
  });
});
