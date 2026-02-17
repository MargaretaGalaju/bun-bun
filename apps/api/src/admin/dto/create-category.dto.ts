import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl, IsInt, Min, Max } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'Электроника' })
  @IsString()
  @IsOptional()
  nameRu?: string;

  @ApiPropertyOptional({ example: 'Electronică' })
  @IsString()
  @IsOptional()
  nameRo?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'uuid-of-parent-category' })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({ example: 1, description: 'Rating from 1 to 100', default: 1 })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  rating?: number;
}
