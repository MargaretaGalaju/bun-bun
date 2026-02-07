import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@bun-bun/shared';

@ApiTags('users')
@Controller()
export class UsersController {
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  getMe() {
    // TODO: Extract user from JWT token via AuthGuard
    return {
      id: 'stub-user-id',
      email: 'user@example.com',
      name: 'John Doe',
      role: Role.BUYER,
    };
  }
}
