import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from './uploads.service';
import { PresignRequestDto } from './dto/presign-request.dto';

@ApiTags('uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SELLER')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('presign')
  @ApiOperation({ summary: 'Get a presigned PUT URL for uploading an image to R2' })
  async presign(
    @CurrentUser() user: RequestUser,
    @Body() dto: PresignRequestDto,
  ) {
    // Verify product ownership
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { sellerId: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.sellerId !== user.id) {
      throw new ForbiddenException('Not your product');
    }

    const key = `products/${dto.productId}/${randomUUID()}.${dto.fileExt}`;
    const uploadUrl = await this.uploadsService.presignPut(key, dto.contentType);
    const publicUrl = this.uploadsService.getPublicUrl(key);

    return { uploadUrl, key, publicUrl };
  }
}
