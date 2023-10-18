import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	async createUser(@Body() data: UserCreateDto) {
		const result = await this.userService.createUser(data);
		return result;
	}

	@Get(':id')
	async getUser(@Param('id') id: number) {
		const result = await this.userService.getUserById(id);
		return result;
	}

	@Get()
	async getAllUser() {
		const result = await this.userService.getAllUsers();
		return result;
	}

	@Patch(':id')
	async updateUser(@Param('id') id: number, @Body() data: UserUpdateDto) {
		const result = await this.userService.updateUser(id, data);
		return result;
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: number) {
		const result = await this.userService.deleteUser(id);
		return result;
	}
}
