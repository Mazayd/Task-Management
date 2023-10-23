import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
	@ApiProperty({ example: '1', description: 'User role id' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 'ADMIN', description: 'User role' })
	@Column()
	value: string;

	@ApiProperty({ example: 'Administrator', description: 'Description user role' })
	@Column()
	description: string;

	@OneToMany((type) => Users, (users) => users)
	users: Users[];
}
