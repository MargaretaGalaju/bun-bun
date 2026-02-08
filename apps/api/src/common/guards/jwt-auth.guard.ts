import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Run passport JWT validation first
    const result = await (super.canActivate(context) as Promise<boolean>);
    if (!result) return false;

    // After passport sets req.user, check if the user is blocked
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.id) {
      const dbUser = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: { isBlocked: true },
      });

      if (dbUser?.isBlocked) {
        throw new ForbiddenException('Account is blocked');
      }
    }

    return true;
  }

  handleRequest<T>(
    err: Error | null,
    user: T,
    info: Error | undefined,
    _context: ExecutionContext,
  ): T {
    if (err || !user) {
      throw new UnauthorizedException(
        info?.message || 'Authentication required. Provide a valid Bearer token.',
      );
    }
    return user;
  }
}
