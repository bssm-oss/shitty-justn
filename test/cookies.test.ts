import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import os from 'node:os';

import { loadCookies } from '../src/notion/cookies.js';

describe('loadCookies', () => {
  it('throws on invalid cookie file', async () => {
    const temp = path.join(os.tmpdir(), `cookies-${Date.now()}.json`);
    await fs.writeJson(temp, { foo: 'bar' });

    const page = { setCookie: async () => undefined } as any;
    await expect(loadCookies(page, temp)).rejects.toThrow(/empty or invalid/);
  });

  it('loads cookies from { cookies: [] } format', async () => {
    const temp = path.join(os.tmpdir(), `cookies-${Date.now()}-ok.json`);
    await fs.writeJson(temp, {
      cookies: [
        { name: 'token_v2', value: 'x', domain: '.notion.so', path: '/', secure: true, httpOnly: true },
      ],
    });

    let count = 0;
    const page = {
      setCookie: async (...cookies: unknown[]) => {
        count = cookies.length;
      },
    } as any;

    const loaded = await loadCookies(page, temp);
    expect(loaded).toBe(1);
    expect(count).toBe(1);
  });

  it('loads cookies from array format and normalizes sameSite', async () => {
    const temp = path.join(os.tmpdir(), `cookies-${Date.now()}-array.json`);
    await fs.writeJson(temp, [
      { name: 'token_v2', value: 'x', domain: '.notion.so', sameSite: 'strict' },
    ]);

    let received: any[] = [];
    const page = {
      setCookie: async (...cookies: unknown[]) => {
        received = cookies as any[];
      },
    } as any;

    const loaded = await loadCookies(page, temp);
    expect(loaded).toBe(1);
    expect(received[0]).toMatchObject({
      name: 'token_v2',
      value: 'x',
      domain: '.notion.so',
      sameSite: 'Strict',
    });
  });

  it('throws on invalid sameSite value', async () => {
    const temp = path.join(os.tmpdir(), `cookies-${Date.now()}-invalid-samesite.json`);
    await fs.writeJson(temp, [
      { name: 'token_v2', value: 'x', domain: '.notion.so', sameSite: 'invalid' },
    ]);

    const page = { setCookie: async () => undefined } as any;
    await expect(loadCookies(page, temp)).rejects.toThrow(/Invalid sameSite value/i);
  });

  it('throws when cookie has neither domain nor url', async () => {
    const temp = path.join(os.tmpdir(), `cookies-${Date.now()}-no-domain-or-url.json`);
    await fs.writeJson(temp, [{ name: 'token_v2', value: 'x' }]);

    const page = { setCookie: async () => undefined } as any;
    await expect(loadCookies(page, temp)).rejects.toThrow(/domain or url/i);
  });
});
