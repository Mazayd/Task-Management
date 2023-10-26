import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { ICreateTask, ITask, IUpdateTask } from './interfaces';
import { IDeleteResponse, IUpdateResponse } from 'src/common';

@Injectable()
export class TasksRepository extends Repository<Tasks> {
	constructor(private dataSourse: DataSource) {
		super(Tasks, dataSourse.createEntityManager());
	}

	async insertTask(data: ICreateTask): Promise<ITask> {
		return await this.save(data);
	}

	async findAllTaskForUser(userId: number): Promise<ITask[]> {
		return await this.createQueryBuilder('tasks')
			.where('tasks.user = :user', { user: userId })
			.leftJoinAndSelect('tasks.user', 'users')
			.leftJoinAndSelect('users.role', 'user_roles')
			.select(['tasks', 'users.id', 'users.username', 'users.createAt', 'user_roles'])
			.getMany();
	}

	async findOneTaskById(id: number): Promise<ITask> {
		return await this.createQueryBuilder('tasks')
			.where('tasks.id = :id', { id })
			.leftJoinAndSelect('tasks.user', 'users')
			.leftJoinAndSelect('users.role', 'user_roles')
			.select(['tasks', 'users.id', 'users.username', 'users.createAt', 'user_roles'])
			.getOne();
	}

	async updateTask(id: number, updateData: IUpdateTask): Promise<IUpdateResponse> {
		return await this.createQueryBuilder('tasks').update().set(updateData).where('id = :id', { id }).execute();
	}

	async deleteTask(id: number): Promise<IDeleteResponse> {
		return await this.delete(id);
	}
}
