import { ApiProperty } from '@nestjs/swagger';
import { ETaskStatus } from 'src/enums/task-status.enum';

export class TaskUpdateDto {
	@ApiProperty({ example: 'To write CRUD', description: 'Task Name' })
	readonly task_name?: string;

	@ApiProperty({ example: 'To write CRUD operations for tasks.', description: 'Task Description' })
	readonly task_description?: string;

	@ApiProperty({ example: 'pending', description: 'Indicates the completion status of the task.' })
	readonly status?: ETaskStatus;

	@ApiProperty({ example: true, description: 'Indicates whether the task has been successfully completed or not.' })
	readonly isCompleted?: boolean;
}
