import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminCategoriesService } from './admin-categories.service';
import { UploadsService } from '../uploads/uploads.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryPresignDto } from './dto/category-presign.dto';

@ApiTags('admin/categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(
    private readonly service: AdminCategoriesService,
    private readonly uploadsService: UploadsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all categories (admin)' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a category (admin)' })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category (admin)' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category (admin)' })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }

  @Post(':id/presign')
  @ApiOperation({ summary: 'Get a presigned PUT URL for uploading a category image to R2' })
  async presign(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CategoryPresignDto,
  ) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const key = `categories/${id}/${randomUUID()}.${dto.fileExt}`;
    const uploadUrl = await this.uploadsService.presignPut(key, dto.contentType);
    const publicUrl = this.uploadsService.getPublicUrl(key);

    return { uploadUrl, key, publicUrl };
  }
}
