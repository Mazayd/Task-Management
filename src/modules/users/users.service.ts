import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PasswordHash } from './helpers/password-hash';
import { UserRolesService } from '../user-roles';
import { IUser, IUserCreate, IUserCreateRes, IUserUpdate } from './interfaces';
import { UserRepository } from './user.repository';
import { IUserUpdateRes } from './interfaces/user-update-res.interface';
import { IDeleteResponse, IUpdateResponse } from 'src/common';

@Injectable()
export class UsersService {
	constructor(
		private readonly userRoleServise: UserRolesService,
		private readonly passwordHash: PasswordHash,
		private readonly userRepository: UserRepository,
	) {}

	async create(user: IUserCreateRes): Promise<IUser> {
		const { username, password, role = 'USER' } = user;
		if (!username || !password) {
			throw new BadRequestException('Username or password is missing.');
		}

		const candidate = await this.userRepository.findOneByUsername(username);
		if (candidate) {
			throw new ConflictException('User with this username already exists.');
		}

		const userRole = await this.userRoleServise.findOneByValue(role);
		if (!userRole) {
			throw new NotFoundException('User role not found');
		}
		const newUser: IUserCreate = {
			username,
			password: await this.passwordHash.hash(password),
			role: userRole,
		};

		return this.userRepository.insertUser(newUser);
	}

	async findAll(): Promise<IUser[]> {
		const users = await this.userRepository.findAllUsers();
		if (!users) {
			throw new NotFoundException('Users not found');
		}
		return users;
	}

	async findOne(id: number): Promise<IUser> {
		const user = await this.userRepository.findOneUserById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async findOneByUsername(username: string): Promise<IUser> {
		const user = await this.userRepository.findOneByUsername(username);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async update(id: number, updateUserDto: IUserUpdateRes): Promise<IUpdateResponse> {
		const { username, password, role } = updateUserDto;
		if (role) {
			const userRole = await this.userRoleServise.findOneByValue(role);
			if (userRole) {
				const newUser: IUserUpdate = {
					username,
					password: await this.passwordHash.hash(password),
					role: userRole,
				};
				return await this.userRepository.updateUser(id, newUser);
			} else {
				throw new NotFoundException(`Role with value ${role} not found`);
			}
		} else {
			const newUser: IUserUpdate = {
				username,
				password: await this.passwordHash.hash(password),
			};
			return await this.userRepository.updateUser(id, newUser);
		}
	}

	async remove(id: number): Promise<IDeleteResponse> {
		return await this.userRepository.deleteUser(id);
	}
}
