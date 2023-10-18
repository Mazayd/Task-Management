import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { generatePasswordHash } from 'src/lib/cryptography/password';
import { UserModel } from './user.model';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
	constructor(private userModel: UserModel) {}

	async createUser(data: UserCreateDto) {
		const { username, password } = data;
		const newUser = await this.userModel.createUser({ username, password });
		return newUser;
	}

	async getUserById(id: number) {
		const user = await this.userModel.getUserById(id);
		return user;
	}

	async getAllUsers() {
		const users = await this.userModel.getAllUsers();
		return users;
	}

	async updateUser(id: number, data: UserUpdateDto) {
		const updatedUser = await this.userModel.updateUser(id, data);
		return updatedUser;
	}

	async deleteUser(id: number) {
		const deletedUser = await this.userModel.deleteUser(id);
		return deletedUser;
	}
}
