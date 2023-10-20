import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
	@ApiProperty({ example: 1, description: 'User id' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 'mazay', description: 'User username' })
	@Column()
	username: string;

	@ApiProperty({ example: '1234', description: 'User password' })
	@Column()
	password: string;

	@ApiProperty({ example: '2023-10-18T08:23:15.653Z', description: 'Date created' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createAt: Date;
}
