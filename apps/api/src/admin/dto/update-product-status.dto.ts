import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  HIDDEN = 'HIDDEN',
  DRAFT = 'DRAFT',
}

export class UpdateProductStatusDto {
  @ApiProperty({ enum: ProductStatusEnum, example: 'HIDDEN' })
  @IsEnum(ProductStatusEnum)
  status!: 'ACTIVE' | 'HIDDEN' | 'DRAFT';
}
