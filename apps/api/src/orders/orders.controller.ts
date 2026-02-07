import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Role } from '@bun-bun/shared';
import { StubAuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { CheckoutRequestDto } from './dto/checkout.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@ApiBearerAuth()
@ApiSecurity('x-user-id')
@ApiSecurity('x-user-role')
@Controller('orders')
@UseGuards(StubAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @Roles(Role.BUYER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Checkout: create an order group with orders split by seller',
    description:
      'Accepts a list of items (productId + qty). ' +
      'Groups them by seller, creates an OrderGroup and one Order per seller, ' +
      'each with OrderItems that snapshot the current product price.',
  })
  @ApiResponse({ status: 201, description: 'Checkout successful' })
  @ApiResponse({ status: 400, description: 'Validation error, products not found or not ACTIVE' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden -- not a BUYER' })
  async checkout(@CurrentUser() user: RequestUser, @Body() dto: CheckoutRequestDto) {
    return this.ordersService.checkout(user.id, dto.items);
  }

  @Get('my')
  @Roles(Role.BUYER)
  @ApiOperation({
    summary: 'Get current buyer order groups with nested orders and items',
    description: 'Returns all OrderGroups for the authenticated buyer, with computed totals.',
  })
  @ApiResponse({ status: 200, description: 'List of order groups' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden -- not a BUYER' })
  async myOrders(@CurrentUser() user: RequestUser) {
    return this.ordersService.getMyOrderGroups(user.id);
  }
}
