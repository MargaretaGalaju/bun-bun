import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * **For local testing only.** Use JwtAuthGuard in production.
 *
 * Reads user identity from x-user-id and x-user-role headers.
 * Useful for manual testing without going through the JWT flow.
 *
 * Usage: replace JwtAuthGuard with StubAuthGuard in controller @UseGuards()
 * and pass headers: x-user-id: <uuid>, x-user-role: BUYER|SELLER|ADMIN
 */
@Injectable()
export class StubAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userId = request.headers['x-user-id'] as string | undefined;
    const userRole = request.headers['x-user-role'] as string | undefined;

    if (!userId || !userRole) {
      throw new UnauthorizedException(
        'Missing x-user-id or x-user-role headers (StubAuthGuard).',
      );
    }

    request.user = { id: userId, role: userRole.toUpperCase() };
    return true;
  }
}
