import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { IUserRole } from './interfaces';
import { IDeleteResponse, IUpdateResponse } from 'src/common';
import {
	CreateUserRoleSwagger,
	DeleteUserRoleSwagger,
	FindAllUserRolesSwagger,
	FindOneUserRoleSwagger,
	UpdateUserRoleSwagger,
} from './user-roles.swagger';

@ApiTags('User role')
@Controller('user-roles')
export class UserRolesController {
	constructor(private readonly userRolesService: UserRolesService) {}

	@ApiBearerAuth()
	@CreateUserRoleSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Post()
	async create(@Body() createUserRoleDto: CreateUserRoleDto): Promise<IUserRole> {
		return await this.userRolesService.create(createUserRoleDto);
	}

	@ApiBearerAuth()
	@FindAllUserRolesSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Get()
	async findAll(): Promise<IUserRole[]> {
		const result = await this.userRolesService.findAll();
		return result;
	}

	@ApiBearerAuth()
	@FindOneUserRoleSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<IUserRole> {
		return await this.userRolesService.findOneById(+id);
	}

	@ApiBearerAuth()
	@UpdateUserRoleSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto): Promise<IUpdateResponse> {
		return this.userRolesService.update(+id, updateUserRoleDto);
	}

	@ApiBearerAuth()
	@DeleteUserRoleSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<IDeleteResponse> {
		return this.userRolesService.remove(+id);
	}
}
