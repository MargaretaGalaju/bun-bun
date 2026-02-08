import { Module } from '@nestjs/common';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminCategoriesService } from './admin-categories.service';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';

@Module({
  controllers: [
    AdminCategoriesController,
    AdminUsersController,
    AdminProductsController,
  ],
  providers: [
    AdminCategoriesService,
    AdminUsersService,
    AdminProductsService,
  ],
})
export class AdminModule {}
