import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminProductsService } from './admin-products.service';
import { AdminUpdateProductStatusDto } from './dto/update-product-status.dto';

@ApiTags('admin/products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly service: AdminProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products (admin, paginated)' })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'sellerId', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  findAll(
    @Query('q') q?: string,
    @Query('status') status?: string,
    @Query('sellerId') sellerId?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.service.findAll({
      q,
      status,
      sellerId,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID (admin)' })
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change product status (admin)' })
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AdminUpdateProductStatusDto,
  ) {
    return this.service.updateStatus(id, dto.status);
  }
}
