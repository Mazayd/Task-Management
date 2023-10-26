import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompletedTaskDto {
	@ApiProperty({ example: true, description: 'Status completed task' })
	readonly completed: boolean;
}
