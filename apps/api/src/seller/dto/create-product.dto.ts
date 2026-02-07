import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Organic Honey' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Pure organic honey from local bees' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 19.99 })
  @IsNumber()
  @Min(0.01)
  price!: number;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  categoryId!: string;

  @ApiPropertyOptional({ example: 'Chisinau' })
  @IsOptional()
  @IsString()
  city?: string;
}
