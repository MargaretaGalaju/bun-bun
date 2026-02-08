import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ['CONFIRMED', 'CANCELLED', 'DELIVERED'], example: 'CONFIRMED' })
  @IsIn(['CONFIRMED', 'CANCELLED', 'DELIVERED'])
  status!: string;
}
