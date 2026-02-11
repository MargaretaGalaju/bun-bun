import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MOLDOVA_CITIES } from './cities.constants';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  @Get()
  @ApiOperation({ summary: 'Get list of Moldova cities' })
  @ApiQuery({ name: 'q', required: false, description: 'Search by city name' })
  findAll(@Query('q') q?: string) {
    if (!q) return MOLDOVA_CITIES;

    const lower = q.toLowerCase();
    return MOLDOVA_CITIES.filter(
      (c) =>
        c.nameRo.toLowerCase().includes(lower) ||
        c.nameRu.toLowerCase().includes(lower) ||
        c.id.includes(lower),
    );
  }
}
