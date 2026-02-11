import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class CategoryPresignDto {
  @ApiProperty({ example: 'image/jpeg', enum: ['image/jpeg', 'image/png', 'image/webp'] })
  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  contentType!: string;

  @ApiProperty({ example: 'jpg', enum: ['jpg', 'jpeg', 'png', 'webp'] })
  @IsIn(['jpg', 'jpeg', 'png', 'webp'])
  fileExt!: string;
}
