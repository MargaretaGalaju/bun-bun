import { Controller, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active products with optional filters' })
  @ApiQuery({ name: 'q', required: false, description: 'Search in title and description' })
  @ApiQuery({ name: 'city', required: false, description: 'Filter by city' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Minimum price' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Maximum price' })
  @ApiQuery({ name: 'sort', required: false, enum: ['price_asc', 'price_desc', 'newest', 'oldest'], description: 'Sort order (default: newest)' })
  async findAll(
    @Query('q') q?: string,
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string,
  ) {
    return this.productsService.findAll({
      q,
      city,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sort: sort as 'price_asc' | 'price_desc' | 'newest' | 'oldest' | undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get active product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async findById(@Param('id') id: string) {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }
}
