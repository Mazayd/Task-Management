import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from './entities/user-role.entity';
import { UpdateResponseDto } from 'src/dto/update-response.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';

@ApiTags('User role')
@Controller('user-roles')
export class UserRolesController {
	constructor(private readonly userRolesService: UserRolesService) {}

	@ApiOperation({ summary: 'Create user role' })
	@ApiResponse({ status: 201, description: 'User created.', type: UserRole })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Post()
	async create(@Body() createUserRoleDto: CreateUserRoleDto) {
		return await this.userRolesService.create(createUserRoleDto);
	}

	@ApiOperation({ summary: 'Get all user roles' })
	@ApiResponse({ status: 201, description: 'User roles found', type: [UserRole] })
	@ApiResponse({ status: 403, description: 'User roles not found.' })
	@Get()
	async findAll() {
		const result = await this.userRolesService.findAll();
		return result;
	}

	@ApiOperation({ summary: 'Get user role by id' })
	@ApiResponse({ status: 201, description: 'User role found.', type: UserRole })
	@ApiResponse({ status: 403, description: 'User role not found.' })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.userRolesService.findOneById(+id);
	}

	@ApiOperation({ summary: 'Update user role' })
	@ApiResponse({ status: 201, description: 'User role updated.', type: UpdateResponseDto })
	@ApiResponse({ status: 403, description: 'User role not found.' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
		return this.userRolesService.update(+id, updateUserRoleDto);
	}

	@ApiOperation({ summary: 'Delete user role' })
	@ApiResponse({ status: 201, description: 'User role deleted.', type: DeleteResponseDto })
	@ApiResponse({ status: 403, description: 'User role not found.' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.userRolesService.remove(+id);
	}
}
