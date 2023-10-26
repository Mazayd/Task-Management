import { ApiProperty } from '@nestjs/swagger';
import { ETaskStatus } from 'src/common';

export class UpdateStatusTaskDto {
	@ApiProperty({ example: ETaskStatus.inProgress, description: 'Task status' })
	readonly status: ETaskStatus;
}
