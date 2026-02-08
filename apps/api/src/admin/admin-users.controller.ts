import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminUsersService } from './admin-users.service';
import { UpdateUserBlockDto } from './dto/update-user-block.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@ApiTags('admin/users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly service: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users (admin, paginated)' })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  findAll(
    @Query('q') q?: string,
    @Query('role') role?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.service.findAll({
      q,
      role,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Block/unblock user (admin)' })
  updateBlock(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserBlockDto,
    @Request() req: any,
  ) {
    return this.service.updateBlock(id, dto.isBlocked, req.user.id);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Change user role (admin)' })
  updateRole(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserRoleDto,
    @Request() req: any,
  ) {
    return this.service.updateRole(id, dto.role, req.user.id);
  }
}
