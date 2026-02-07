import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * Stub AuthGuard for development.
 * Reads user identity from x-user-id and x-user-role headers.
 *
 * TODO: Replace with real JWT AuthGuard (@nestjs/passport + passport-jwt)
 */
@Injectable()
export class StubAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userId = request.headers['x-user-id'] as string | undefined;
    const userRole = request.headers['x-user-role'] as string | undefined;

    if (!userId || !userRole) {
      throw new UnauthorizedException(
        'Missing x-user-id or x-user-role headers. ' +
          'TODO: Replace StubAuthGuard with real JWT authentication.',
      );
    }

    request.user = { id: userId, role: userRole.toUpperCase() };
    return true;
  }
}
