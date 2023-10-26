import { ApiProperty } from '@nestjs/swagger';
import { ETaskStatus } from 'src/common';
import { IUser, UserDto } from 'src/modules/users';

export class TaskDto {
	@ApiProperty({ example: 1, description: 'Task id' })
	readonly id: number;

	@ApiProperty({ example: 'Work', description: 'Task name' })
	readonly taskName: string;

	@ApiProperty({ example: 'To do the task for today.', description: 'User id' })
	readonly taskDescription: string;

	@ApiProperty({ example: true, description: 'Indicates whether it is a personal task or not.' })
	readonly personal: boolean;

	@ApiProperty({ example: ETaskStatus.peding, description: 'Task completion status.' })
	readonly status: ETaskStatus;

	@ApiProperty({ example: true, description: 'Indicates whether the task has been successfully completed or not.' })
	readonly completed: boolean | null;

	@ApiProperty({ example: '2023-10-18T08:23:15.653Z', description: 'Date create task.' })
	readonly createAt: Date;

	@ApiProperty({ example: '2023-10-18T08:23:15.653Z', description: 'Date update task.' })
	readonly updateAt: Date;

	@ApiProperty({ example: UserDto, description: 'User ID performing the task.' })
	readonly user?: UserDto;
}
