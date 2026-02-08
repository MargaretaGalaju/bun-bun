import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SellerProductsController } from './seller-products.controller';
import { SellerProductsService } from './seller-products.service';
import { SellerOrdersController } from './seller-orders.controller';
import { SellerOrdersService } from './seller-orders.service';

@Module({
  imports: [PrismaModule],
  controllers: [SellerProductsController, SellerOrdersController],
  providers: [SellerProductsService, SellerOrdersService],
})
export class SellerModule {}
