import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PdfAuthError, PdfOutputError, PdfTimeoutError } from '../src/errors.js';

const mocks = vi.hoisted(() => ({
  buildPdf: vi.fn(),
  logError: vi.fn(),
}));

vi.mock('../src/build.js', () => ({
  buildPdf: mocks.buildPdf,
}));

vi.mock('../src/utils/logger.js', () => ({
  logError: mocks.logError,
}));

import { executeCli, runCli } from '../src/cli.js';

class ExitSignal extends Error {
  code: number | undefined;

  constructor(code: number | undefined) {
    super(`process.exit(${code})`);
    this.code = code;
  }
}

function mockProcessExit() {
  return vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
    throw new ExitSignal(code);
  }) as never);
}

describe('cli', () => {
  beforeEach(() => {
    mocks.buildPdf.mockReset().mockResolvedValue(undefined);
    mocks.logError.mockReset();
  });

  it('parses numeric options and maps --no-sandbox into noSandbox', async () => {
    const exitSpy = mockProcessExit();

    await expect(
      runCli([
        'node',
        'better-notion2pdf',
        '--url',
        'https://www.notion.so/page',
        '--wait-ms',
        '5',
        '--timeout-ms',
        '6000',
        '--code-font-size',
        '12',
        '--no-sandbox',
      ])
    ).rejects.toMatchObject({ code: 0 });

    expect(mocks.buildPdf).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://www.notion.so/page',
        waitMs: 5,
        timeoutMs: 6000,
        codeFontSize: 12,
        noSandbox: true,
      })
    );

    exitSpy.mockRestore();
  });

  it('exits with 10 on invalid options', async () => {
    const exitSpy = mockProcessExit();

    await expect(
      runCli([
        'node',
        'better-notion2pdf',
        '--url',
        'https://www.notion.so/page',
        '--timeout-ms',
        '999',
      ])
    ).rejects.toMatchObject({ code: 10 });

    expect(mocks.buildPdf).not.toHaveBeenCalled();
    expect(mocks.logError).toHaveBeenCalledWith(expect.stringMatching(/^Invalid options:/));

    exitSpy.mockRestore();
  });

  it('returns 20 on PdfTimeoutError', async () => {
    mocks.buildPdf.mockRejectedValueOnce(new PdfTimeoutError('timeout'));

    await expect(
      executeCli({
        url: 'https://www.notion.so/page',
        waitMs: '1200',
        timeoutMs: '45000',
        codeFontSize: '11',
        sandbox: true,
      })
    ).resolves.toBe(20);
    expect(mocks.logError).toHaveBeenCalledWith('timeout');
  });

  it('returns 30 on PdfAuthError', async () => {
    mocks.buildPdf.mockRejectedValueOnce(new PdfAuthError('auth'));

    await expect(
      executeCli({
        url: 'https://www.notion.so/page',
        waitMs: '1200',
        timeoutMs: '45000',
        codeFontSize: '11',
        sandbox: true,
      })
    ).resolves.toBe(30);
    expect(mocks.logError).toHaveBeenCalledWith('auth');
  });

  it('returns 40 on PdfOutputError', async () => {
    mocks.buildPdf.mockRejectedValueOnce(new PdfOutputError('write failed'));

    await expect(
      executeCli({
        url: 'https://www.notion.so/page',
        waitMs: '1200',
        timeoutMs: '45000',
        codeFontSize: '11',
        sandbox: true,
      })
    ).resolves.toBe(40);
    expect(mocks.logError).toHaveBeenCalledWith('write failed');
  });

  it('returns 50 on unknown errors', async () => {
    mocks.buildPdf.mockRejectedValueOnce(new Error('boom'));

    await expect(
      executeCli({
        url: 'https://www.notion.so/page',
        waitMs: '1200',
        timeoutMs: '45000',
        codeFontSize: '11',
        sandbox: true,
      })
    ).resolves.toBe(50);
    expect(mocks.logError).toHaveBeenCalledWith('boom');
  });
});
