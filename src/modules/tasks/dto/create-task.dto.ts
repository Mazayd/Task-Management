import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
	@ApiProperty({ example: 'Work', description: 'Task name' })
	readonly taskName: string;

	@ApiProperty({ example: 'To do the task for today.', description: 'Task description' })
	readonly taskDescription: string;

	@ApiProperty({ example: true, description: 'Indicates whether it is a personal task or not.' })
	readonly personal: boolean;
}
