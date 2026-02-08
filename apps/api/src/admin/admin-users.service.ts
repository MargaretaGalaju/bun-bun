import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface AdminUsersListOptions {
  q?: string;
  role?: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(opts: AdminUsersListOptions = {}) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 20));

    const where: Prisma.UserWhereInput = {};

    if (opts.role) {
      where.role = opts.role as any;
    }

    if (opts.q) {
      where.OR = [
        { email: { contains: opts.q, mode: 'insensitive' } },
        { name: { contains: opts.q, mode: 'insensitive' } },
        { phone: { contains: opts.q, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          isBlocked: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: items.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        phone: u.phone,
        role: u.role,
        isBlocked: u.isBlocked,
        createdAt: u.createdAt.toISOString(),
      })),
      page,
      pageSize,
      total,
    };
  }

  async updateBlock(id: string, isBlocked: boolean, currentAdminId: string) {
    if (id === currentAdminId) {
      throw new BadRequestException('Cannot block yourself');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { isBlocked },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isBlocked: true,
        createdAt: true,
      },
    });

    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      phone: updated.phone,
      role: updated.role,
      isBlocked: updated.isBlocked,
      createdAt: updated.createdAt.toISOString(),
    };
  }

  async updateRole(id: string, role: string, currentAdminId: string) {
    if (id === currentAdminId) {
      throw new BadRequestException('Cannot change your own role');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { role: role as any },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isBlocked: true,
        createdAt: true,
      },
    });

    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      phone: updated.phone,
      role: updated.role,
      isBlocked: updated.isBlocked,
      createdAt: updated.createdAt.toISOString(),
    };
  }
}
