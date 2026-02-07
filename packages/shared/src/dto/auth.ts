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

export interface AuthTokenResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
  };
}
