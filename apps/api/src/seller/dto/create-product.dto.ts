import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Miere ecologică' })
  @IsString()
  @IsNotEmpty()
  titleRo!: string;

  @ApiProperty({ example: 'Экологический мёд' })
  @IsString()
  @IsNotEmpty()
  titleRu!: string;

  @ApiProperty({ example: 'Miere pură ecologică de la albine locale' })
  @IsString()
  @IsNotEmpty()
  descriptionRo!: string;

  @ApiProperty({ example: 'Чистый экологический мёд от местных пчёл' })
  @IsString()
  @IsNotEmpty()
  descriptionRu!: string;

  @ApiProperty({ example: 19.99 })
  @IsNumber()
  @Min(0.01)
  price!: number;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  categoryId!: string;

  @ApiPropertyOptional({ example: 'chisinau' })
  @IsOptional()
  @IsString()
  city?: string;
}
