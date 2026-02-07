import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<T>(err: Error | null, user: T, info: Error | undefined, _context: ExecutionContext): T {
    if (err || !user) {
      throw new UnauthorizedException(
        info?.message || 'Authentication required. Provide a valid Bearer token.',
      );
    }
    return user;
  }
}
