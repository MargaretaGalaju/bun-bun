import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsInt, Min, Max } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Electronics' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Электроника' })
  @IsString()
  @IsOptional()
  nameRu?: string;

  @ApiPropertyOptional({ example: 'Electronică' })
  @IsString()
  @IsOptional()
  nameRo?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png', nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string | null;

  @ApiPropertyOptional({ example: 'uuid-of-parent-category', nullable: true })
  @IsUUID()
  @IsOptional()
  parentId?: string | null;

  @ApiPropertyOptional({ example: 50, description: 'Rating from 1 to 100' })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  rating?: number;
}
