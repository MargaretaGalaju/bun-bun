import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createHash } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthTokenResponse, RefreshTokenResponse, AuthUserDto } from '@bun-bun/shared';
import { Role } from '@bun-bun/shared';

@Injectable()
export class AuthService {
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    this.refreshExpiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
  }

  async register(dto: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }): Promise<AuthTokenResponse> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        role: (dto.role as Role) || Role.BUYER,
      },
    });

    const tokens = await this.generateTokens(user.id, user.role);

    return {
      ...tokens,
      user: this.toUserDto(user),
    };
  }

  async login(dto: { email: string; password: string }): Promise<AuthTokenResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await argon2.verify(user.password, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.isBlocked) {
      throw new ForbiddenException('Account is blocked');
    }

    const tokens = await this.generateTokens(user.id, user.role);

    return {
      ...tokens,
      user: this.toUserDto(user),
    };
  }

  async refresh(oldRefreshToken: string): Promise<RefreshTokenResponse> {
    // 1. Verify the refresh token JWT
    let payload: { sub: string; role: string };
    try {
      payload = this.jwt.verify(oldRefreshToken, {
        secret: this.refreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // 2. Find the hashed token in DB
    const tokenHash = this.hashToken(oldRefreshToken);
    const stored = await this.prisma.refreshToken.findFirst({
      where: { tokenHash, userId: payload.sub },
    });

    if (!stored) {
      // Token was already used or revoked -- possible token theft
      // Revoke all refresh tokens for this user as a safety measure
      await this.prisma.refreshToken.deleteMany({
        where: { userId: payload.sub },
      });
      throw new UnauthorizedException('Refresh token revoked');
    }

    if (stored.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { id: stored.id } });
      throw new UnauthorizedException('Refresh token expired');
    }

    // 3. Delete the old token (rotation)
    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    // 4. Generate new token pair
    return this.generateTokens(payload.sub, payload.role);
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) return;

    const tokenHash = this.hashToken(refreshToken);
    await this.prisma.refreshToken.deleteMany({
      where: { tokenHash },
    });
  }

  async getMe(userId: string): Promise<AuthUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.toUserDto(user);
  }

  // ── Private helpers ───────────────────────────────────────

  private async generateTokens(
    userId: string,
    role: string,
  ): Promise<RefreshTokenResponse> {
    const accessToken = this.jwt.sign(
      { sub: userId, role },
      // access secret + expiry from JwtModule defaults
    );

    const refreshToken = this.jwt.sign(
      { sub: userId, role },
      {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresIn as any,
      },
    );

    // Store hashed refresh token in DB
    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.parseDays(this.refreshExpiresIn));

    await this.prisma.refreshToken.create({
      data: { tokenHash, userId, expiresAt },
    });

    return { accessToken, refreshToken };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private toUserDto(user: {
    id: string;
    email: string;
    name: string;
    role: string;
  }): AuthUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
    };
  }

  private parseDays(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)d$/);
    return match ? parseInt(match[1], 10) : 7;
  }
}
