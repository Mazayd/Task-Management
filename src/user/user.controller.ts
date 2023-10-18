import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './user.model';
import { UpdateResponseDto } from 'src/dto/update-response.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, description: 'User created.', type: Users })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Post()
	async createUser(@Body() data: UserCreateDto) {
		const result = await this.userService.createUser(data);
		return result;
	}

	@ApiOperation({ summary: 'Get user by id' })
	@ApiResponse({ status: 200, description: 'User found.', type: Users })
	@ApiResponse({ status: 404, description: 'User not found' })
	@Get(':id')
	async getUser(@Param('id') id: number) {
		const result = await this.userService.getUserById(id);
		if (!result) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'Users found.', type: [Users] })
	@ApiResponse({ status: 404, description: 'Users not found' })
	@Get()
	async getAllUser() {
		const result = await this.userService.getAllUsers();
		if (!result) {
			throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Update user by id' })
	@ApiResponse({ status: 200, description: 'User updated.', type: UpdateResponseDto })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Patch(':id')
	async updateUser(@Param('id') id: number, @Body() data: UserUpdateDto) {
		const result = await this.userService.updateUser(id, data);
		if (!result.affected) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Delete user by id' })
	@ApiResponse({ status: 200, description: 'User deleted.', type: DeleteResponseDto })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Delete(':id')
	async deleteUser(@Param('id') id: number) {
		const result = await this.userService.deleteUser(id);
		if (!result.affected) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}
}
