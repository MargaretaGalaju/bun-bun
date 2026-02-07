import type { RefreshTokenResponse } from '@bun-bun/shared';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../auth/secureStore';

// For local development, use your machine's IP address instead of localhost
// when testing on a physical device.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ── Callback for auth failure ───────────────────────────────

let _onAuthFailure: (() => void) | null = null;

export function onAuthFailure(cb: () => void) {
  _onAuthFailure = cb;
}

// ── Core fetch ──────────────────────────────────────────────

async function rawFetch<T>(path: string, options?: RequestInit, token?: string | null): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  const accessToken = token ?? (await getAccessToken());
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    // No credentials: 'include' for mobile — no cookies
  });

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      /* empty */
    }
    throw new ApiError(res.status, `API error: ${res.status}`, body);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

// ── Refresh logic ───────────────────────────────────────────

let _refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return false;

    const data = await rawFetch<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    await saveTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    await clearTokens();
    return false;
  }
}

function refreshOnce(): Promise<boolean> {
  if (!_refreshPromise) {
    _refreshPromise = tryRefresh().finally(() => {
      _refreshPromise = null;
    });
  }
  return _refreshPromise;
}

// ── Public fetch with auto-refresh ──────────────────────────

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    return await rawFetch<T>(path, options);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      const refreshed = await refreshOnce();
      if (refreshed) {
        return rawFetch<T>(path, options);
      }
      _onAuthFailure?.();
    }
    throw err;
  }
}
