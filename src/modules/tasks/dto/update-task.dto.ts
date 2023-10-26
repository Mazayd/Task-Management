import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ETaskStatus } from 'src/common';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	status: ETaskStatus;
	completed: boolean;
}
