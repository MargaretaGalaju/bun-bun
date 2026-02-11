import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
  IsUrl,
  IsInt,
  IsIn,
} from 'class-validator';

export { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Miere ecologică' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titleRo?: string;

  @ApiPropertyOptional({ example: 'Экологический мёд' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titleRu?: string;

  @ApiPropertyOptional({ example: 'Miere pură ecologică de la albine locale' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descriptionRo?: string;

  @ApiPropertyOptional({ example: 'Чистый экологический мёд от местных пчёл' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descriptionRu?: string;

  @ApiPropertyOptional({ example: 19.99 })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @ApiPropertyOptional({ example: 'uuid-of-category' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ example: 'chisinau' })
  @IsOptional()
  @IsString()
  city?: string;
}

export class UpdateProductStatusDto {
  @ApiProperty({ enum: ['DRAFT', 'ACTIVE', 'HIDDEN'], example: 'ACTIVE' })
  @IsIn(['DRAFT', 'ACTIVE', 'HIDDEN'])
  status!: string;
}

export class AddProductImageDto {
  @ApiProperty({ example: 'products/uuid/image.jpg' })
  @IsString()
  @IsNotEmpty()
  key!: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}
