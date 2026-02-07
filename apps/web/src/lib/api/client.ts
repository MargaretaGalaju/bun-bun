'use client';

import type { RefreshTokenResponse } from '@bun-bun/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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

// ── Token management ────────────────────────────────────────
// Access token lives in memory only (short-lived, not persisted).
// Refresh is handled via httpOnly cookie automatically.

let _accessToken: string | null = null;
let _onAuthFailure: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
}

export function getAccessToken(): string | null {
  return _accessToken;
}

export function onAuthFailure(cb: () => void) {
  _onAuthFailure = cb;
}

// ── Core fetch ──────────────────────────────────────────────

async function rawFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (_accessToken) {
    headers['Authorization'] = `Bearer ${_accessToken}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // send httpOnly refresh cookie
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
    const data = await rawFetch<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    _accessToken = data.accessToken;
    return true;
  } catch {
    _accessToken = null;
    return false;
  }
}

// Deduplicate concurrent refresh calls
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
      // Refresh failed — notify auth context to clear state
      _onAuthFailure?.();
    }
    throw err;
  }
}
