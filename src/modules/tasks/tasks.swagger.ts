import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { UpdateResponseDto } from 'src/common';

const CreateTaskSwagger = (): any => {
	return applyDecorators(ApiOperation({ summary: 'Create task' }), ApiResponse({ status: 201, type: TaskDto }));
};

const FindAllTaskForUserSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Find all the task for the user' }),
		ApiResponse({ status: 200, type: [TaskDto] }),
		ApiResponse({ status: 404, description: 'Tasks not found' }),
	);
};

const FindOneTaskByIdSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Find one task by id' }),
		ApiResponse({ status: 200, type: TaskDto }),
		ApiResponse({ status: 404, description: 'Tasks not found' }),
	);
};

const UpdateTaskNameAndDescriptionSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Update name and description task by id' }),
		ApiResponse({ status: 200, type: UpdateResponseDto }),
		ApiResponse({ status: 403, description: 'You cannot modify tasks that belong to others.' }),
		ApiResponse({ status: 404, description: 'Tasks not found' }),
	);
};

const UpdateTaskStatusSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Update status task by id' }),
		ApiResponse({ status: 200, type: UpdateResponseDto }),
		ApiResponse({ status: 403, description: 'You cannot modify tasks that belong to others.' }),
		ApiResponse({ status: 404, description: 'Tasks not found' }),
	);
};

const UpdateTaskCompletedSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Update complete task by id' }),
		ApiResponse({ status: 200, type: UpdateResponseDto }),
		ApiResponse({ status: 403, description: 'You cannot modify tasks that belong to others.' }),
		ApiResponse({ status: 404, description: 'Tasks not found' }),
	);
};

const DeleteTaskSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete task by id' }),
		ApiResponse({ status: 200, type: UpdateResponseDto }),
		ApiResponse({ status: 403, description: 'You cannot modify tasks that belong to others.' }),
		ApiResponse({ status: 404, description: 'Tasks not found' }),
	);
};

export {
	CreateTaskSwagger,
	FindAllTaskForUserSwagger,
	FindOneTaskByIdSwagger,
	UpdateTaskNameAndDescriptionSwagger,
	UpdateTaskStatusSwagger,
	UpdateTaskCompletedSwagger,
	DeleteTaskSwagger,
};
