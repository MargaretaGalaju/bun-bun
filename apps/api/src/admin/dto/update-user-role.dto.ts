import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

enum RoleEnum {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export class UpdateUserRoleDto {
  @ApiProperty({ enum: RoleEnum, example: 'SELLER' })
  @IsEnum(RoleEnum)
  role!: 'BUYER' | 'SELLER' | 'ADMIN';
}
