import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Users } from './entities/user.entity';
import { UpdateResponseDto } from 'src/dto/update-response.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, description: 'User created.', type: Users })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}

	@ApiOperation({ summary: 'Get all user' })
	@ApiResponse({ status: 200, description: 'Users found.', type: [Users] })
	@ApiResponse({ status: 404, description: 'Users not found' })
	@Get()
	async findAll() {
		const result = await this.usersService.findAll();
		if (!result) {
			throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Get user by id' })
	@ApiResponse({ status: 200, description: 'User found.', type: Users })
	@ApiResponse({ status: 404, description: 'User not found' })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const result = await this.usersService.findOne(+id);
		if (!result) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Update user by id' })
	@ApiResponse({ status: 200, description: 'User updated.', type: UpdateResponseDto })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const result = await this.usersService.update(+id, updateUserDto);
		if (!result.affected) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Delete user by id' })
	@ApiResponse({ status: 200, description: 'User deleted.', type: DeleteResponseDto })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		const result = await this.usersService.remove(+id);
		if (!result.affected) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}
}
