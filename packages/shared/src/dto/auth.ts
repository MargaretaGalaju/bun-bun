import { Role } from '../enums';

export interface AuthRegisterDto {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthUserDto {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
