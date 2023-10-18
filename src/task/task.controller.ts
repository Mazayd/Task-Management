import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tasks } from './task.model';
import { UpdateResponseDto } from 'src/dto/update-response.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';

@ApiTags('Task')
@Controller('task')
export class TaskController {
	constructor(private taskService: TaskService) {}

	@ApiOperation({ summary: 'Create task' })
	@ApiResponse({ status: 201, description: 'Task created.', type: Tasks })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Post()
	async createTask(@Body() data: TaskCreateDto) {
		const result = await this.taskService.createTask(data);
		return result;
	}

	@ApiOperation({ summary: 'Get task' })
	@ApiResponse({ status: 200, description: 'Task found.', type: Tasks })
	@ApiResponse({ status: 404, description: 'Task not found.' })
	@Get(':id')
	async getTask(@Param('id') id: number) {
		const result = await this.taskService.getTask(id);
		if (!result) {
			throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Get all tasks' })
	@ApiResponse({ status: 200, description: 'Tasks found.', type: [Tasks] })
	@ApiResponse({ status: 404, description: 'Tasks not found.' })
	@Get()
	async getAllTasks() {
		const result = await this.taskService.getAllTasks();
		if (!result.length) {
			throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Update task' })
	@ApiResponse({ status: 200, description: 'Task updated.', type: UpdateResponseDto })
	@ApiResponse({ status: 404, description: 'Task not found.' })
	@Patch(':id')
	async updateTask(@Param('id') id: number, @Body() data: TaskUpdateDto) {
		const result = await this.taskService.updateTask(id, data);
		if (!result.affected) {
			throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiOperation({ summary: 'Delete task' })
	@ApiResponse({ status: 200, description: 'Task deleted.', type: DeleteResponseDto })
	@ApiResponse({ status: 404, description: 'Task not found.' })
	@Delete(':id')
	async deleteTask(@Param('id') id: number) {
		const result = await this.taskService.deleteTask(id);
		if (!result.affected) {
			throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}
}
