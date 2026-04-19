import path from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PdfAuthError, PdfOutputError, PdfTimeoutError } from '../src/errors.js';

const mocks = vi.hoisted(() => {
  const spinner = {
    text: '',
    start: vi.fn(),
    warn: vi.fn(),
    succeed: vi.fn(),
  };

  spinner.start.mockReturnValue(spinner);

  return {
    spinner,
    launch: vi.fn(),
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
    autoScrollToBottom: vi.fn(),
    waitForImages: vi.fn(),
    waitForLayoutStable: vi.fn(),
    injectProfileCss: vi.fn(),
    loadCookies: vi.fn(),
    cleanNotionAppUI: vi.fn(),
    oraFactory: vi.fn(() => ({
      start: vi.fn(() => spinner),
    })),
  };
});

vi.mock('puppeteer', () => ({
  default: {
    launch: mocks.launch,
  },
}));

vi.mock('ora', () => ({
  default: mocks.oraFactory,
}));

vi.mock('fs-extra', () => ({
  default: {
    ensureDir: mocks.ensureDir,
    writeFile: mocks.writeFile,
  },
}));

vi.mock('../src/notion/waitForRender.js', () => ({
  autoScrollToBottom: mocks.autoScrollToBottom,
  waitForImages: mocks.waitForImages,
  waitForLayoutStable: mocks.waitForLayoutStable,
}));

vi.mock('../src/notion/injectStyles.js', () => ({
  injectProfileCss: mocks.injectProfileCss,
}));

vi.mock('../src/notion/cookies.js', () => ({
  loadCookies: mocks.loadCookies,
}));

vi.mock('../src/notion/cleanUI.js', () => ({
  cleanNotionAppUI: mocks.cleanNotionAppUI,
}));

import { buildPdf } from '../src/build.js';

function createPage(overrides: Record<string, unknown> = {}) {
  return {
    setDefaultNavigationTimeout: vi.fn(),
    goto: vi.fn().mockResolvedValue(undefined),
    screenshot: vi.fn().mockResolvedValue(undefined),
    content: vi.fn().mockResolvedValue('<html />'),
    pdf: vi.fn().mockResolvedValue(undefined),
    evaluate: vi.fn().mockResolvedValue(7),
    ...overrides,
  };
}

function createBrowser(page: ReturnType<typeof createPage>) {
  return {
    newPage: vi.fn().mockResolvedValue(page),
    close: vi.fn().mockResolvedValue(undefined),
  };
}

const baseOptions = {
  url: 'https://www.notion.so/my-page',
  out: 'output.pdf',
  format: 'A4' as const,
  margin: '18mm,16mm,18mm,16mm',
  profile: 'notion-default' as const,
  cleanLevel: 'soft' as const,
  waitMs: 0,
  timeoutMs: 45000,
  keepUi: false,
  cookieFile: undefined,
  codeWrap: 'soft' as const,
  codeFontSize: 11,
  debugShot: undefined,
  debugHtml: undefined,
  noSandbox: false,
  verbose: false,
};

describe('buildPdf', () => {
  beforeEach(() => {
    mocks.launch.mockReset();
    mocks.ensureDir.mockReset().mockResolvedValue(undefined);
    mocks.writeFile.mockReset().mockResolvedValue(undefined);
    mocks.autoScrollToBottom.mockReset().mockResolvedValue(undefined);
    mocks.waitForImages.mockReset().mockResolvedValue(undefined);
    mocks.waitForLayoutStable.mockReset().mockResolvedValue({ stable: true, iterations: 2 });
    mocks.injectProfileCss.mockReset().mockResolvedValue('INJECTED_CSS');
    mocks.loadCookies.mockReset().mockResolvedValue(2);
    mocks.cleanNotionAppUI.mockReset().mockResolvedValue(undefined);
    mocks.oraFactory.mockClear();
    mocks.spinner.text = '';
    mocks.spinner.start.mockReset().mockReturnValue(mocks.spinner);
    mocks.spinner.warn.mockReset();
    mocks.spinner.succeed.mockReset();
  });

  it('builds a pdf and writes debug artifacts through the happy path', async () => {
    const page = createPage();
    const browser = createBrowser(page);
    mocks.launch.mockResolvedValue(browser);
    mocks.waitForImages.mockRejectedValueOnce(new Error('timed out'));
    mocks.waitForLayoutStable.mockResolvedValueOnce({ stable: false, iterations: 30 });

    await buildPdf({
      ...baseOptions,
      out: 'artifacts/output.pdf',
      profile: 'portfolio',
      cleanLevel: 'hard',
      cookieFile: 'cookies.json',
      codeWrap: 'hard',
      codeFontSize: 14,
      debugShot: 'debug/out.png',
      debugHtml: 'debug/page.html',
      noSandbox: true,
      verbose: true,
    });

    expect(mocks.launch).toHaveBeenCalledWith({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    expect(page.setDefaultNavigationTimeout).toHaveBeenCalledWith(45000);
    expect(mocks.loadCookies).toHaveBeenCalledWith(page, 'cookies.json');
    expect(mocks.autoScrollToBottom).toHaveBeenCalledWith(page);
    expect(mocks.waitForImages).toHaveBeenCalledWith(page, 45000);
    expect(mocks.waitForLayoutStable).toHaveBeenCalledWith(page);
    expect(mocks.cleanNotionAppUI).toHaveBeenCalledWith(page, 'hard');
    expect(mocks.injectProfileCss).toHaveBeenCalledWith(page, 'portfolio', {
      codeWrap: 'hard',
      codeFontSize: 14,
    });
    expect(page.screenshot).toHaveBeenCalledWith({
      path: path.resolve('debug/out.png'),
      fullPage: true,
    });
    expect(page.pdf).toHaveBeenCalledWith({
      path: path.resolve('artifacts/output.pdf'),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '18mm',
        right: '16mm',
        bottom: '18mm',
        left: '16mm',
      },
      preferCSSPageSize: true,
    });

    expect(mocks.spinner.warn).toHaveBeenCalledTimes(2);
    expect(mocks.writeFile).toHaveBeenCalledWith(path.resolve('debug/page.html'), '<html />', 'utf-8');
    expect(mocks.writeFile).toHaveBeenCalledWith(path.resolve('debug/injected-css.css'), 'INJECTED_CSS', 'utf-8');

    const logCall = mocks.writeFile.mock.calls.find(([file]) => file === path.resolve('debug/build-log.json'));
    expect(logCall).toBeTruthy();
    const log = JSON.parse(logCall![1] as string);
    expect(log).toMatchObject({
      url: 'https://www.notion.so/my-page',
      output: path.resolve('artifacts/output.pdf'),
      profile: 'portfolio',
      cleanLevel: 'hard',
      keepUi: false,
      codeWrap: 'hard',
      codeFontSize: 14,
      cookieFileUsed: true,
      removedUiCount: 7,
      imageWaitTimedOut: true,
    });

    expect(mocks.spinner.succeed).toHaveBeenCalledWith(`PDF generated: ${path.resolve('artifacts/output.pdf')}`);
    expect(browser.close).toHaveBeenCalled();
  });

  it('skips UI cleanup when keepUi is enabled', async () => {
    const page = createPage();
    const browser = createBrowser(page);
    mocks.launch.mockResolvedValue(browser);

    await buildPdf({
      ...baseOptions,
      keepUi: true,
    });

    expect(mocks.cleanNotionAppUI).not.toHaveBeenCalled();
    expect(browser.close).toHaveBeenCalled();
  });

  it('maps navigation timeout errors to PdfTimeoutError', async () => {
    const page = createPage({
      goto: vi.fn().mockRejectedValue(new Error('Navigation timeout of 45000 ms exceeded')),
    });
    const browser = createBrowser(page);
    mocks.launch.mockResolvedValue(browser);

    await expect(buildPdf(baseOptions)).rejects.toBeInstanceOf(PdfTimeoutError);
    expect(browser.close).toHaveBeenCalled();
  });

  it('maps auth-like navigation errors to PdfAuthError', async () => {
    const page = createPage({
      goto: vi.fn().mockRejectedValue(new Error('403 Forbidden')),
    });
    const browser = createBrowser(page);
    mocks.launch.mockResolvedValue(browser);

    await expect(buildPdf(baseOptions)).rejects.toBeInstanceOf(PdfAuthError);
    expect(browser.close).toHaveBeenCalled();
  });

  it('wraps pdf generation failures in PdfOutputError', async () => {
    const page = createPage({
      pdf: vi.fn().mockRejectedValue(new Error('disk full')),
    });
    const browser = createBrowser(page);
    mocks.launch.mockResolvedValue(browser);

    await expect(buildPdf(baseOptions)).rejects.toBeInstanceOf(PdfOutputError);
    expect(browser.close).toHaveBeenCalled();
  });
});
