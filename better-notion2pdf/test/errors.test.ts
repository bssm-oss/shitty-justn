import { describe, it, expect } from 'vitest';
import { PdfAuthError, PdfOutputError, PdfTimeoutError } from '../src/errors.js';

describe('custom pdf errors', () => {
  it('sets prototype and name for PdfTimeoutError', () => {
    const err = new PdfTimeoutError('timeout');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(PdfTimeoutError);
    expect(err.name).toBe('PdfTimeoutError');
  });

  it('sets prototype and name for PdfAuthError', () => {
    const err = new PdfAuthError('auth');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(PdfAuthError);
    expect(err.name).toBe('PdfAuthError');
  });

  it('sets prototype and name for PdfOutputError', () => {
    const err = new PdfOutputError('output');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(PdfOutputError);
    expect(err.name).toBe('PdfOutputError');
  });
});
