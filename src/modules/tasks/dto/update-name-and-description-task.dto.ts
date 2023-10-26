import { ApiProperty } from '@nestjs/swagger';

export class UpdateNameAndDescriptionDto {
	@ApiProperty({ example: 'Work', description: 'Task name' })
	readonly taskName: string;

	@ApiProperty({ example: 'To do the task for today.', description: 'Task description' })
	readonly taskDescription: string;
}
