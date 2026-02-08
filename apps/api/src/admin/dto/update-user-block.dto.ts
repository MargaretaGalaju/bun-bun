import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserBlockDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isBlocked!: boolean;
}
