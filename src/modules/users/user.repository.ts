import { DataSource, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { IUser, IUserCreate } from './interfaces';
import { Injectable } from '@nestjs/common';
import { IDeleteResponse, IUpdateResponse } from 'src/common';
import { IUserUpdate } from './interfaces/user-update.interface';

@Injectable()
export class UserRepository extends Repository<Users> {
	constructor(private dataSource: DataSource) {
		super(Users, dataSource.createEntityManager());
	}
	public async insertUser(user: IUserCreate): Promise<IUser> {
		const newUser = await this.save(user);
		const { password, ...userWithoutPassword } = newUser;
		return userWithoutPassword;
	}

	public async findOneByUsername(username: string): Promise<IUser> {
		const user = await this.findOne({ where: { username }, relations: ['role'] });
		return user;
	}

	public async findOneUserById(id: number): Promise<IUser> {
		const user = await this.findOne({ where: { id }, relations: ['role'] });
		return user;
	}

	public async findAllUsers(): Promise<IUser[]> {
		const users = await this.createQueryBuilder('users')
			.select(['users.id', 'users.username', 'users.createAt', 'users.role'])
			.leftJoinAndSelect('users.role', 'user_roles')
			.getMany();
		return users;
	}

	public async updateUser(id: number, data: IUserUpdate): Promise<IUpdateResponse> {
		return await this.update({ id }, data);
	}

	public async deleteUser(id: number): Promise<IDeleteResponse> {
		return await this.delete({ id });
	}
}
