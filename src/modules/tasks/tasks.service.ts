import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ICreateTask, ITask, IUpdateTask } from './interfaces';
import { IUser, UsersService } from '../users';
import { TasksRepository } from './tasks.repository';
import { IDeleteResponse, IUpdateResponse } from 'src/common';

@Injectable()
export class TasksService {
	constructor(
		private userService: UsersService,
		private tasksRepository: TasksRepository,
	) {}

	async createTaskForUser(data: ICreateTask, username: string): Promise<ITask> {
		const user = await this.userService.findOneByUsername(username);
		data.user = user;
		const newTask = await this.tasksRepository.insertTask(data);
		return newTask;
	}

	async findAllTaskForUser(userId: number): Promise<ITask[]> {
		const tasks = await this.tasksRepository.findAllTaskForUser(userId);
		if (!tasks) {
			throw new NotFoundException('Tasks not found');
		}
		return tasks;
	}

	async findOneTaskById(id: number): Promise<ITask> {
		const task = await this.tasksRepository.findOneTaskById(id);
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		return task;
	}

	async updateTask(id: number, updateTaskDto: IUpdateTask, user: IUser): Promise<IUpdateResponse> {
		const task = await this.tasksRepository.findOneTaskById(id);
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		if (task.user.id !== user.id) {
			throw new ForbiddenException('You cannot modify tasks that belong to others.');
		}

		const updateData = {
			taskName: updateTaskDto.taskName,
			taskDescription: updateTaskDto.taskDescription,
			status: updateTaskDto.status,
			completed: updateTaskDto.completed,
		};
		const result = await this.tasksRepository.updateTask(id, updateData);
		return result;
	}

	async deleteTaskById(id: number, user: IUser): Promise<IDeleteResponse> {
		const task = await this.tasksRepository.findOneTaskById(id);
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		if (task.user.id !== user.id) {
			throw new ForbiddenException('You cannot delete tasks that belong to others.');
		}
		return await this.tasksRepository.deleteTask(id);
	}
}
