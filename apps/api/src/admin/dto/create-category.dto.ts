import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

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
}
