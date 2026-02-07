'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { AuthUserDto, AuthLoginDto, AuthRegisterDto } from '@bun-bun/shared';
import { setAccessToken, onAuthFailure } from '../api/client';
import * as authApi from '../api/auth';

interface AuthContextValue {
  user: AuthUserDto | null;
  isLoading: boolean;
  login: (dto: AuthLoginDto) => Promise<void>;
  register: (dto: AuthRegisterDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  // On mount: try to restore session from refresh cookie
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      try {
        const tokens = await authApi.refresh();
        setAccessToken(tokens.accessToken);
        const me = await authApi.getMe();
        if (!cancelled) setUser(me);
      } catch {
        // No valid session — stay logged out
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    // Register callback for when any apiFetch gets a 401 that can't be refreshed
    onAuthFailure(() => {
      clearAuth();
    });

    restore();

    return () => {
      cancelled = true;
    };
  }, [clearAuth]);

  const login = useCallback(async (dto: AuthLoginDto) => {
    const result = await authApi.login(dto);
    setAccessToken(result.accessToken);
    setUser(result.user);
  }, []);

  const register = useCallback(async (dto: AuthRegisterDto) => {
    const result = await authApi.register(dto);
    setAccessToken(result.accessToken);
    setUser(result.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors — clear local state regardless
    }
    clearAuth();
  }, [clearAuth]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}
