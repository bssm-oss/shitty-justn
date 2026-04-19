import { afterEach, describe, it, expect, vi } from 'vitest';
import { autoScrollToBottom, waitForImages, waitForLayoutStable } from '../src/notion/waitForRender.js';

afterEach(() => {
  vi.useRealTimers();
});

describe('autoScrollToBottom', () => {
  it('stops after the first pass when scroll height does not change', async () => {
    vi.useFakeTimers();

    const page = {
      evaluate: vi
        .fn()
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(1000)
        .mockResolvedValueOnce(1000),
    } as any;

    const pending = autoScrollToBottom(page);
    await vi.runAllTimersAsync();
    await pending;

    expect(page.evaluate).toHaveBeenCalledTimes(3);
    expect(page.evaluate.mock.calls[0][1]).toBe(0);
  });

  it('runs a second pass when scroll height grows after the first pass', async () => {
    vi.useFakeTimers();

    const page = {
      evaluate: vi
        .fn()
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(1000)
        .mockResolvedValueOnce(1400)
        .mockResolvedValueOnce(undefined),
    } as any;

    const pending = autoScrollToBottom(page);
    await vi.runAllTimersAsync();
    await pending;

    expect(page.evaluate).toHaveBeenCalledTimes(4);
    expect(page.evaluate.mock.calls[0][1]).toBe(0);
    expect(page.evaluate.mock.calls[3][1]).toBe(1);
  });
});

describe('waitForImages', () => {
  it('passes timeout to page.waitForFunction', async () => {
    let receivedTimeout: number | undefined;
    const page = {
      waitForFunction: async (_fn: unknown, opts: { timeout: number }) => {
        receivedTimeout = opts.timeout;
      },
    } as any;

    await waitForImages(page, 1234);
    expect(receivedTimeout).toBe(1234);
  });
});

describe('waitForLayoutStable', () => {
  it('returns stable=true when height settles for required rounds', async () => {
    const heights = [100, 120, 120, 120];
    let idx = 0;
    const page = {
      evaluate: async () => heights[Math.min(idx++, heights.length - 1)],
    } as any;

    const result = await waitForLayoutStable(page, 2, 1, 10);
    expect(result.stable).toBe(true);
    expect(result.iterations).toBeGreaterThanOrEqual(3);
  });

  it('returns stable=false when max iterations reached before stable', async () => {
    let h = 100;
    const page = {
      evaluate: async () => ++h,
    } as any;

    const result = await waitForLayoutStable(page, 2, 1, 3);
    expect(result.stable).toBe(false);
    expect(result.iterations).toBe(3);
  });
});
