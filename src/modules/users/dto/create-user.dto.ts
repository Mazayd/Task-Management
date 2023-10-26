import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'mazay', description: 'Username' })
	readonly username: string;

	@ApiProperty({ example: '1234', description: 'Password' })
	readonly password: string;

	@ApiProperty({ example: 'USER', description: 'User role' })
	readonly role?: string;
}
