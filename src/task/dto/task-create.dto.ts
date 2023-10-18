import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
	@ApiProperty({ example: 'To write CRUD', description: 'Task Name' })
	readonly task_name: string;

	@ApiProperty({ example: 'To write CRUD operations for tasks.', description: 'Task Description' })
	readonly task_description: string;

	@ApiProperty({ example: false, description: 'Indicates whether the task is personal or not.' })
	readonly personal?: boolean;
}
