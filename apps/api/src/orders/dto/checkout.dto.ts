import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';

export class CheckoutItemDto {
  @ApiProperty({ description: 'Product UUID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  productId!: string;

  @ApiProperty({ description: 'Quantity (>= 1)', example: 2 })
  @IsInt()
  @Min(1)
  qty!: number;
}

export class CheckoutRequestDto {
  @ApiProperty({
    description: 'List of items to purchase',
    type: [CheckoutItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[];
}
