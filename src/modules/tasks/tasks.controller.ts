import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateCompletedTaskDto, UpdateStatusTaskDto } from './dto';
import { IDeleteResponse, IRequestWitchUser, IUpdateResponse, JwtGuard, RoleGuard } from 'src/common';
import { ITask } from './interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateNameAndDescriptionDto } from './dto/update-name-and-description-task.dto';
import {
	CreateTaskSwagger,
	DeleteTaskSwagger,
	FindAllTaskForUserSwagger,
	FindOneTaskByIdSwagger,
	UpdateTaskCompletedSwagger,
	UpdateTaskNameAndDescriptionSwagger,
	UpdateTaskStatusSwagger,
} from './tasks.swagger';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@ApiBearerAuth()
	@CreateTaskSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Post()
	async createTaskForUser(@Body() createTaskDto: CreateTaskDto, @Req() req: IRequestWitchUser): Promise<ITask> {
		const username = req.user.username;
		return await this.tasksService.createTaskForUser(createTaskDto, username);
	}

	@ApiBearerAuth()
	@FindAllTaskForUserSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Get()
	async findAllUserTask(@Req() req: IRequestWitchUser): Promise<ITask[]> {
		const userId = req.user.id;
		return await this.tasksService.findAllTaskForUser(userId);
	}

	@ApiBearerAuth()
	@FindOneTaskByIdSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Get(':id')
	async findOneTaskById(@Param('id') id: string): Promise<ITask> {
		return await this.tasksService.findOneTaskById(+id);
	}

	@ApiBearerAuth()
	@UpdateTaskNameAndDescriptionSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Patch('nameAndDescription/:id')
	async updateTaskNameAndDescription(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateNameAndDescriptionDto,
		@Req() req: IRequestWitchUser,
	): Promise<IUpdateResponse> {
		const user = req.user;
		return await this.tasksService.updateTask(+id, updateTaskDto, user);
	}

	@ApiBearerAuth()
	@UpdateTaskStatusSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Patch('status/:id')
	async updateTaskStatus(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateStatusTaskDto,
		@Req() req: IRequestWitchUser,
	): Promise<IUpdateResponse> {
		const user = req.user;
		return await this.tasksService.updateTask(+id, updateTaskDto, user);
	}

	@ApiBearerAuth()
	@UpdateTaskCompletedSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Patch('completed/:id')
	async updateTaskComplete(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateCompletedTaskDto,
		@Req() req: IRequestWitchUser,
	): Promise<IUpdateResponse> {
		const user = req.user;
		return await this.tasksService.updateTask(+id, updateTaskDto, user);
	}

	@ApiBearerAuth()
	@DeleteTaskSwagger()
	@UseGuards(JwtGuard, new RoleGuard('USER'))
	@Delete(':id')
	remove(@Param('id') id: string, @Req() req: IRequestWitchUser): Promise<IDeleteResponse> {
		const user = req.user;
		return this.tasksService.deleteTaskById(+id, user);
	}
}
