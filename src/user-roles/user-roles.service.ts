import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
	constructor(@InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>) {}
	async create(createUserRoleDto: CreateUserRoleDto) {
		const newUserRole = this.userRoleRepository.create(createUserRoleDto);
		return await this.userRoleRepository.save(newUserRole);
	}

	async findAll() {
		return await this.userRoleRepository.find();
	}

	async findOneById(id: number) {
		return await this.userRoleRepository.findOne({ where: { id } });
	}

	async findOneByValue(value: string) {
		return await this.userRoleRepository.findOne({ where: { value } });
	}

	async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
		return await this.userRoleRepository.update({ id }, updateUserRoleDto);
	}

	async remove(id: number) {
		return await this.userRoleRepository.delete({ id });
	}
}
