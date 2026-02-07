import type { AuthRegisterDto, AuthLoginDto, AuthTokenResponse } from '@bun-bun/shared';
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
