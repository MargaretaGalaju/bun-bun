import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

@Injectable()
export class AdminCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      nameRu: c.nameRu,
      nameRo: c.nameRo,
      slug: c.slug,
      imageUrl: c.imageUrl,
      parentId: c.parentId,
      rating: c.rating,
    }));
  }

  async create(dto: CreateCategoryDto) {
    let slug = slugify(dto.name);

    // Ensure slug uniqueness
    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const category = await this.prisma.category.create({
      data: {
        name: dto.name,
        nameRu: dto.nameRu || null,
        nameRo: dto.nameRo || null,
        slug,
        imageUrl: dto.imageUrl || null,
        parentId: dto.parentId || null,
        rating: dto.rating ?? 1,
      },
    });

    return {
      id: category.id,
      name: category.name,
      nameRu: category.nameRu,
      nameRo: category.nameRo,
      slug: category.slug,
      imageUrl: category.imageUrl,
      parentId: category.parentId,
      rating: category.rating,
    };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    const data: Record<string, unknown> = {};

    if (dto.name !== undefined) {
      data.name = dto.name;
      // Regenerate slug if name changed
      let slug = slugify(dto.name);
      const slugConflict = await this.prisma.category.findFirst({
        where: { slug, NOT: { id } },
      });
      if (slugConflict) {
        slug = `${slug}-${Date.now()}`;
      }
      data.slug = slug;
    }

    if (dto.nameRu !== undefined) data.nameRu = dto.nameRu;
    if (dto.nameRo !== undefined) data.nameRo = dto.nameRo;
    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl;
    if (dto.parentId !== undefined) data.parentId = dto.parentId;
    if (dto.rating !== undefined) data.rating = dto.rating;

    const category = await this.prisma.category.update({
      where: { id },
      data,
    });

    return {
      id: category.id,
      name: category.name,
      nameRu: category.nameRu,
      nameRo: category.nameRo,
      slug: category.slug,
      imageUrl: category.imageUrl,
      parentId: category.parentId,
      rating: category.rating,
    };
  }

  async delete(id: string) {
    const existing = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    if (existing._count.products > 0) {
      throw new BadRequestException(
        `Cannot delete category with ${existing._count.products} product(s). Reassign products first.`,
      );
    }

    await this.prisma.category.delete({ where: { id } });
    return { deleted: true };
  }
}
