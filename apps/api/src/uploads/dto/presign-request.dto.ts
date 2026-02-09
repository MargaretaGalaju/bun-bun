import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsUUID } from 'class-validator';

export class PresignRequestDto {
  @ApiProperty({ example: 'uuid-of-product' })
  @IsUUID()
  productId!: string;

  @ApiProperty({ example: 'image/jpeg', enum: ['image/jpeg', 'image/png', 'image/webp'] })
  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  contentType!: string;

  @ApiProperty({ example: 'jpg', enum: ['jpg', 'jpeg', 'png', 'webp'] })
  @IsIn(['jpg', 'jpeg', 'png', 'webp'])
  fileExt!: string;
}
