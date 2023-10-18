import { Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@Injectable()
export class TaskService {
	constructor(private taskModel: TaskModel) {}
	async createTask(data: TaskCreateDto) {
		const newTask = await this.taskModel.createTask(data);
		return newTask;
	}

	async getTask(id: number) {
		const task = await this.taskModel.getTask(id);
		return task;
	}

	async getAllTasks() {
		const tasks = await this.taskModel.getAllTasks();
		return tasks;
	}

	async updateTask(id: number, data: TaskUpdateDto) {
		const updatedTask = await this.taskModel.updateTask(id, data);
		return updatedTask;
	}

	async deleteTask(id: number) {
		const deletedTask = await this.taskModel.deleteTask(id);
		return deletedTask;
	}
}
