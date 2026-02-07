import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ enum: ['BUYER', 'SELLER'], default: 'BUYER' })
  @IsOptional()
  @IsEnum(['BUYER', 'SELLER'], { message: 'Role must be BUYER or SELLER' })
  role?: 'BUYER' | 'SELLER';
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class RefreshDto {
  @ApiPropertyOptional({ description: 'Refresh token (optional if sent via cookie)' })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
