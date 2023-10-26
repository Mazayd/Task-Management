import { ApiProperty } from '@nestjs/swagger';
import { ETaskStatus } from 'src/common/enums/task-status-enum';
import { Users } from 'src/modules/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tasks {
	@ApiProperty({ example: 1, description: 'Task id' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 'Work', description: 'Task name' })
	@Column()
	taskName: string;

	@ApiProperty({ example: 'To do the task for today.', description: 'User id' })
	@Column({ type: 'text' })
	taskDescription: string;

	@ApiProperty({ example: true, description: 'Indicates whether it is a personal task or not.' })
	@Column()
	personal: boolean;

	@ApiProperty({ example: ETaskStatus.peding, description: 'Task completion status.' })
	@Column({ default: ETaskStatus.peding })
	status: ETaskStatus;

	@ApiProperty({ example: true, description: 'Indicates whether the task has been successfully completed or not.' })
	@Column({ default: null })
	completed: boolean | null;

	@ApiProperty({ example: '2023-10-18T08:23:15.653Z', description: 'Date create task.' })
	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createAt: Date;

	@ApiProperty({ example: '2023-10-18T08:23:15.653Z', description: 'Date update task.' })
	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	updateAt: Date;

	@ApiProperty({ example: 1, description: 'User ID performing the task.' })
	@ManyToOne((type) => Users, (user) => user)
	user: Users;
}
