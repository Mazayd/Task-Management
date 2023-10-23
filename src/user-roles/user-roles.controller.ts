import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from './entities/user-role.entity';
import { UpdateResponseDto } from 'src/dto/update-response.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';

@ApiTags('User role')
@Controller('user-roles')
export class UserRolesController {
	constructor(private readonly userRolesService: UserRolesService) {}

	@ApiOperation({ summary: 'Create user role' })
	@ApiResponse({ status: 201, description: 'User created.', type: UserRole })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Post()
	async create(@Body() createUserRoleDto: CreateUserRoleDto) {
		return await this.userRolesService.create(createUserRoleDto);
	}

	@ApiOperation({ summary: 'Get all user roles' })
	@ApiResponse({ status: 201, description: 'User roles found', type: [UserRole] })
	@ApiResponse({ status: 403, description: 'User roles not found.' })
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Get()
	async findAll() {
		const result = await this.userRolesService.findAll();
		return result;
	}

	@ApiOperation({ summary: 'Get user role by id' })
	@ApiResponse({ status: 201, description: 'User role found.', type: UserRole })
	@ApiResponse({ status: 403, description: 'User role not found.' })
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.userRolesService.findOneById(+id);
	}

	@ApiOperation({ summary: 'Update user role' })
	@ApiResponse({ status: 201, description: 'User role updated.', type: UpdateResponseDto })
	@ApiResponse({ status: 403, description: 'User role not found.' })
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
		return this.userRolesService.update(+id, updateUserRoleDto);
	}

	@ApiOperation({ summary: 'Delete user role' })
	@ApiResponse({ status: 201, description: 'User role deleted.', type: DeleteResponseDto })
	@ApiResponse({ status: 403, description: 'User role not found.' })
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.userRolesService.remove(+id);
	}
}
