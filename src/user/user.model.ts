import { InjectRepository } from '@nestjs/typeorm';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryColumn()
	username: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createAt: Date;
}

export class UserModel {
	constructor(@InjectRepository(Users) private user: Repository<Users>) {}

	async createUser(data: UserCreateDto) {
		const user = this.user.create(data);
		return await this.user.save(user);
	}

	async getUserByUsername(username: string) {
		return await this.user.findOneBy({ username });
	}

	async getUserById(id: number) {
		return await this.user.findOneBy({ id });
	}

	async getAllUsers() {
		return await this.user.find();
	}

	async updateUser(id: number, data: UserUpdateDto) {
		return await this.user.update({ id }, data);
	}

	async deleteUser(id: number) {
		return await this.user.delete({ id });
	}
}
