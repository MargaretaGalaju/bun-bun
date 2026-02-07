import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthRegisterDto, AuthLoginDto, AuthTokenResponse } from '@bun-bun/shared';
import { Role } from '@bun-bun/shared';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: AuthRegisterDto): Promise<AuthTokenResponse> {
    // TODO: Hash password with bcrypt
    // TODO: Check if email already exists
    // TODO: Generate real JWT token

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password, // TODO: hash this
        name: dto.name,
        role: dto.role || Role.BUYER,
      },
    });

    return {
      accessToken: 'stub-jwt-token', // TODO: real JWT
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as Role,
      },
    };
  }

  async login(dto: AuthLoginDto): Promise<AuthTokenResponse> {
    // TODO: Verify password with bcrypt
    // TODO: Generate real JWT token

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // TODO: proper error handling
      throw new Error('User not found');
    }

    return {
      accessToken: 'stub-jwt-token', // TODO: real JWT
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as Role,
      },
    };
  }
}
