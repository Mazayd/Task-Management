import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { IUserRole, IUserRoleCreate, IUserRoleUpdate } from './interfaces';
import { IDeleteResponse, IUpdateResponse } from 'src/common';

@Injectable()
export class UserRolesRepository extends Repository<UserRole> {
	constructor(private dataSource: DataSource) {
		super(UserRole, dataSource.createEntityManager());
	}

	public async insertUserRole(data: IUserRoleCreate): Promise<IUserRole> {
		return await this.save(data);
	}

	public async findAllUserRoles(): Promise<IUserRole[]> {
		return await this.find();
	}

	public async findOneUserRoleById(id: number): Promise<IUserRole> {
		return await this.findOne({ where: { id } });
	}

	public async findOneUserRoleByValue(value: string): Promise<IUserRole> {
		return await this.findOne({ where: { value } });
	}

	public async updateUserRoleById(id: number, data: IUserRoleUpdate): Promise<IUpdateResponse> {
		return await this.update({ id }, data);
	}

	public async deleteUserRoleById(id: number): Promise<IDeleteResponse> {
		return await this.delete({ id });
	}
}
