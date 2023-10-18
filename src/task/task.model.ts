import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type } from 'os';
import { Users } from 'src/user/user.model';
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, Repository } from 'typeorm';
import { TaskCreateDto } from './dto/task-create.dto';
import { ETaskStatus } from 'src/enums/task-status.enum';
import { TaskUpdateDto } from './dto/task-update.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tasks {
	@ApiProperty({ example: 1, description: 'Task id' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 'To write CRUD', description: 'Task Name' })
	@Column()
	task_name: string;

	@ApiProperty({ example: 'To write CRUD operations for tasks.', description: 'Task Description' })
	@Column({ type: 'text' })
	task_description: string;

	@ApiProperty({ example: false, description: 'Indicates whether the task is personal or not.' })
	@Column({ default: false })
	personal: boolean;

	@ApiProperty({ example: 'pending', description: 'Indicates the completion status of the task.' })
	@Column({ type: 'enum', enum: ETaskStatus, default: ETaskStatus.pending })
	status: ETaskStatus;

	@ApiProperty({ example: null, description: 'Indicates whether the task has been successfully completed or not.' })
	@Column({ default: null })
	isCompleted: boolean | null;

	@ManyToOne((type) => Users, (user) => user.tasks)
	user: Users;
}

@Injectable()
export class TaskModel {
	constructor(@InjectRepository(Tasks) private task: Repository<Tasks>) {}

	async createTask(data: TaskCreateDto) {
		const task = this.task.create(data);
		return this.task.save(task);
	}

	async getTask(id: number) {
		return await this.task.findOne({ where: { id } });
	}

	async getAllTasks() {
		return await this.task.find();
	}

	async updateTask(id: number, data: TaskUpdateDto) {
		return await this.task.update({ id }, data);
	}

	async deleteTask(id: number) {
		return await this.task.delete({ id });
	}
}
