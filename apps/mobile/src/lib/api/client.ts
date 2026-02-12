import type { RefreshTokenResponse } from '@bun-bun/shared';
import { Platform } from 'react-native';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../auth/secureStore';

const PRODUCTION_API_URL = 'https://api.bunbun.market';

// Native (iOS/Android) uses prod unless EXPO_PUBLIC_API_URL is set; web defaults to localhost for dev.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Platform.OS === 'web' ? 'http://localhost:3000' : PRODUCTION_API_URL);

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

function devLog(method: string, url: string, status?: number, duration?: number) {
  if (__DEV__) {
    const statusStr = status != null ? ` ${status}` : '';
    const durationStr = duration != null ? ` ${duration}ms` : '';
    // eslint-disable-next-line no-console
    console.log(`[API] ${method} ${url}${statusStr}${durationStr}`);
  }
}

async function rawFetch<T>(path: string, options?: RequestInit, token?: string | null): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const method = (options?.method ?? 'GET').toUpperCase();
  const start = __DEV__ ? Date.now() : 0;

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

  if (__DEV__) {
    devLog(method, url, res.status, Date.now() - start);
  }

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
