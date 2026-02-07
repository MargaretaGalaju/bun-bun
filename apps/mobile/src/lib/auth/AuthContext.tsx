import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { AuthUserDto, AuthLoginDto, AuthRegisterDto } from '@bun-bun/shared';
import { saveTokens, getRefreshToken, clearTokens } from './secureStore';
import { onAuthFailure } from '../api/client';
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

  const clearAuth = useCallback(async () => {
    await clearTokens();
    setUser(null);
  }, []);

  // On mount: try to restore session from SecureStore
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          if (!cancelled) setIsLoading(false);
          return;
        }

        // Refresh to get new tokens
        const tokens = await authApi.refresh(refreshToken);
        await saveTokens(tokens.accessToken, tokens.refreshToken);

        // Fetch user profile
        const me = await authApi.getMe();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) await clearAuth();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    // Register callback for unrecoverable 401s
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
    await saveTokens(result.accessToken, result.refreshToken);
    setUser(result.user);
  }, []);

  const register = useCallback(async (dto: AuthRegisterDto) => {
    const result = await authApi.register(dto);
    await saveTokens(result.accessToken, result.refreshToken);
    setUser(result.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch {
      // Ignore errors — clear local state regardless
    }
    await clearAuth();
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
