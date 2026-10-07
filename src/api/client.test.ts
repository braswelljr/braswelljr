import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildApiUrl, handleResponse, toQuery } from './client';
import { isApiError } from './errors';

describe('toQuery', () => {
  it('returns an empty string when there is nothing to send', () => {
    expect(toQuery()).toBe('');
    expect(toQuery({})).toBe('');
  });

  it('drops empty values so a default view keeps a clean URL', () => {
    expect(toQuery({ page: 2, q: '', sort: undefined, limit: 10 })).toBe('?page=2&limit=10');
  });

  it('keeps a zero, which is a value and not an absence', () => {
    expect(toQuery({ page: 0 })).toBe('?page=0');
  });

  it('repeats the key for each entry of an array', () => {
    expect(toQuery({ tag: ['go', 'react'] })).toBe('?tag=go&tag=react');
  });

  it('encodes characters that would otherwise break the query', () => {
    expect(toQuery({ q: 'a&b=c' })).toBe('?q=a%26b%3Dc');
  });
});

describe('buildApiUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('is relative in the browser', () => {
    vi.stubGlobal('window', {});
    expect(buildApiUrl('/github/repos')).toBe('/api/github/repos');
    expect(buildApiUrl('github/repos')).toBe('/api/github/repos');
  });

  it('uses the configured origin on the server', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.test');
    expect(buildApiUrl('/spotify/top-tracks')).toBe('https://example.test/api/spotify/top-tracks');
  });

  it('falls back to the deployment URL, then to localhost', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', undefined);
    vi.stubEnv('VERCEL_URL', 'preview.example.test');
    expect(buildApiUrl('/x')).toBe('https://preview.example.test/api/x');

    vi.stubEnv('VERCEL_URL', undefined);
    expect(buildApiUrl('/x')).toBe('http://localhost:3000/api/x');
  });
});

describe('handleResponse', () => {
  it('returns the parsed body of a successful JSON response', async () => {
    const res = Response.json({ message: 'ok', data: [1, 2] });
    await expect(handleResponse(res)).resolves.toEqual({ message: 'ok', data: [1, 2] });
  });

  it('throws a typed error carrying the status and the upstream message', async () => {
    const res = Response.json({ message: 'No such repo' }, { status: 404 });

    const error = await handleResponse(res).catch((e: unknown) => e);

    expect(isApiError(error, 'NOT_FOUND')).toBe(true);
    expect(isApiError(error) && error.status).toBe(404);
    expect(isApiError(error) && error.message).toBe('No such repo');
  });

  it('maps a rate limit to its own code', async () => {
    const res = Response.json({ message: 'Slow down' }, { status: 429 });
    const error = await handleResponse(res).catch((e: unknown) => e);
    expect(isApiError(error, 'RATE_LIMITED')).toBe(true);
  });
});
