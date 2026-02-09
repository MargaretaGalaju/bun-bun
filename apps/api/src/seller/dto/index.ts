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
  @ApiPropertyOptional({ example: 'Organic Honey' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ example: 'Pure organic honey from local bees' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({ example: 19.99 })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @ApiPropertyOptional({ example: 'uuid-of-category' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ example: 'Chisinau' })
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
