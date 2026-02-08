import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { SellerOrdersService } from './seller-orders.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiTags('seller/orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SELLER')
@Controller('seller/orders')
export class SellerOrdersController {
  constructor(private readonly sellerOrdersService: SellerOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List all orders for the current seller (newest first)' })
  async list(@CurrentUser() user: RequestUser) {
    return this.sellerOrdersService.listOrders(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details (own order only)' })
  async getOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.sellerOrdersService.getOrder(id, user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status (CONFIRMED / CANCELLED / DELIVERED)' })
  async updateStatus(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.sellerOrdersService.updateStatus(id, user.id, dto.status);
  }
}
