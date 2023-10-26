import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { IUserRole, IUserRoleCreate, IUserRoleUpdate } from './interfaces';
import { UserRolesRepository } from './user-roles.repository';
import { IDeleteResponse, IUpdateResponse } from 'src/common';

@Injectable()
export class UserRolesService {
	constructor(private userRolesRepository: UserRolesRepository) {}

	async create(role: IUserRoleCreate): Promise<IUserRole> {
		const { value, description } = role;
		if (!value || !description) {
			throw new BadRequestException('Value or description missing');
		}

		const userRoleCandidate = await this.userRolesRepository.findOneUserRoleByValue(value);
		if (userRoleCandidate) {
			throw new ConflictException('The user role already exists.');
		}

		return this.userRolesRepository.insertUserRole(role);
	}

	async findAll(): Promise<IUserRole[]> {
		return await this.userRolesRepository.findAllUserRoles();
	}

	async findOneById(id: number): Promise<IUserRole> {
		return await this.userRolesRepository.findOneUserRoleById(id);
	}

	async findOneByValue(value: string): Promise<IUserRole> {
		return await this.userRolesRepository.findOneUserRoleByValue(value);
	}

	async update(id: number, updateData: IUserRoleUpdate): Promise<IUpdateResponse> {
		return await this.userRolesRepository.updateUserRoleById(id, updateData);
	}

	async remove(id: number): Promise<IDeleteResponse> {
		return await this.userRolesRepository.deleteUserRoleById(id);
	}
}
