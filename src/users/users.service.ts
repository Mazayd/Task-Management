import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { PasswordHash } from './helpers/password-hash';
import { IUserCreate } from './interfaces/user-create.interface';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users) private readonly userRepository: Repository<Users>,
		private readonly userRoleServise: UserRolesService,
		private readonly passwordHash: PasswordHash,
	) {}

	async create(createUserDto: CreateUserDto) {
		const { username, password, role = 'USER' } = createUserDto;
		if (!username || !password) {
			throw new BadRequestException('Username or password is missing.');
		}

		const candidate = await this.userRepository.findOne({ where: { username } });
		if (candidate) {
			throw new ConflictException('User with this username already exists.');
		}

		const userRole = await this.userRoleServise.findOneByValue(role);
		if (!userRole) {
			throw new NotFoundException('User role not found');
		}
		const user: IUserCreate = {
			username,
			password: await this.passwordHash.hash(password),
			role: userRole,
		};

		return this.userRepository.save(user);
	}

	async findAll() {
		const users = await this.userRepository.find();
		if (!users) {
			throw new NotFoundException('Users not found');
		}
		return users;
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne({ where: { id }, relations: ['roleId'] });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async findOneByUsername(username: string) {
		const user = await this.userRepository.findOne({ where: { username }, relations: ['role'] });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const { username, password, role } = updateUserDto;
		if (role) {
			const userRole = await this.userRoleServise.findOneByValue(role);
			if (userRole) {
				return await this.userRepository.update({ id }, { username, password, role: userRole });
			} else {
				throw new NotFoundException(`Role with value ${role} not found`);
			}
		} else {
			return await this.userRepository.update({ id }, { username, password });
		}
	}

	async remove(id: number) {
		return await this.userRepository.delete({ id });
	}
}
