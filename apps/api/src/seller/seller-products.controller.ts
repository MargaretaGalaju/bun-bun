import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { SellerProductsService } from './seller-products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductStatusDto,
  AddProductImageDto,
} from './dto';

@ApiTags('seller/products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SELLER')
@Controller('seller/products')
export class SellerProductsController {
  constructor(private readonly sellerProductsService: SellerProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product (DRAFT by default)' })
  async create(@CurrentUser() user: RequestUser, @Body() dto: CreateProductDto) {
    return this.sellerProductsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all own products (any status)' })
  async findAll(@CurrentUser() user: RequestUser) {
    return this.sellerProductsService.findAllOwn(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get own product by ID' })
  async findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.sellerProductsService.findOneOwn(id, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update own product' })
  async update(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.sellerProductsService.update(id, user.id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change product status (DRAFT / ACTIVE / HIDDEN)' })
  async updateStatus(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateProductStatusDto,
  ) {
    return this.sellerProductsService.updateStatus(id, user.id, dto.status);
  }

  @Post(':id/images')
  @ApiOperation({ summary: 'Add image URL to own product' })
  async addImage(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: AddProductImageDto,
  ) {
    return this.sellerProductsService.addImage(id, user.id, dto);
  }

  @Delete(':id/images/:imageId')
  @ApiOperation({ summary: 'Remove image from own product' })
  async removeImage(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Param('imageId') imageId: string,
  ) {
    await this.sellerProductsService.removeImage(id, imageId, user.id);
    return { deleted: true };
  }
}
