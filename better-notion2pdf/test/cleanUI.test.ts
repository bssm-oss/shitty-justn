// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import { cleanNotionAppUI } from '../src/notion/cleanUI.js';

describe('cleanNotionAppUI', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    delete (window as unknown as { __better_notion2pdf_removed?: number }).__better_notion2pdf_removed;
  });

  it('hides soft-mode chrome and floating controls while preserving content blocks', async () => {
    document.body.innerHTML = `
      <div class="notion-topbar" id="topbar"></div>
      <button aria-label="Comments" id="comments"></button>
      <div class="floating" id="floating" style="position: fixed;"></div>
      <img id="image" style="position: fixed;" />
      <div class="notion-page-content">
        <div class="inside-content" id="inside-content" style="position: sticky;"></div>
      </div>
    `;

    const page = {
      evaluate: async (fn: (level: 'soft' | 'hard') => void, level: 'soft' | 'hard') => fn(level),
    } as any;

    await cleanNotionAppUI(page, 'soft');

    expect(document.getElementById('topbar')?.getAttribute('style')).toContain('display: none');
    expect(document.getElementById('comments')?.getAttribute('style')).toContain('display: none');
    expect(document.getElementById('floating')?.getAttribute('style')).toContain('display: none');
    expect(document.getElementById('image')?.getAttribute('style')).not.toContain('display: none');
    expect(document.getElementById('inside-content')?.getAttribute('style')).not.toContain('display: none');
    expect((window as unknown as { __better_notion2pdf_removed?: number }).__better_notion2pdf_removed).toBe(2);
  });

  it('removes additional selectors in hard mode', async () => {
    document.body.innerHTML = `
      <div class="notion-page-cover-wrapper" id="cover"></div>
      <div class="notion-breadcrumb" id="breadcrumb"></div>
      <button aria-label="Open in Notion" id="open-in-notion"></button>
    `;

    const page = {
      evaluate: async (fn: (level: 'soft' | 'hard') => void, level: 'soft' | 'hard') => fn(level),
    } as any;

    await cleanNotionAppUI(page, 'hard');

    expect(document.getElementById('cover')?.getAttribute('style')).toContain('display: none');
    expect(document.getElementById('breadcrumb')?.getAttribute('style')).toContain('display: none');
    expect(document.getElementById('open-in-notion')?.getAttribute('style')).toContain('display: none');
    expect((window as unknown as { __better_notion2pdf_removed?: number }).__better_notion2pdf_removed).toBe(3);
  });
});
