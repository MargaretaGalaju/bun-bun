import type {
  AuthRegisterDto,
  AuthLoginDto,
  AuthTokenResponse,
  AuthUserDto,
  RefreshTokenResponse,
} from '@bun-bun/shared';
import { apiFetch } from './client';

export function register(dto: AuthRegisterDto): Promise<AuthTokenResponse> {
  return apiFetch<AuthTokenResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function login(dto: AuthLoginDto): Promise<AuthTokenResponse> {
  return apiFetch<AuthTokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function refresh(): Promise<RefreshTokenResponse> {
  return apiFetch<RefreshTokenResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export function logout(): Promise<void> {
  return apiFetch<void>('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export function getMe(): Promise<AuthUserDto> {
  return apiFetch<AuthUserDto>('/auth/me');
}
