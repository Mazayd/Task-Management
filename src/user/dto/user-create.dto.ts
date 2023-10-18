import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
	@ApiProperty({ example: 'mazay', description: 'Username' })
	readonly username: string;

	@ApiProperty({ example: '1234', description: 'Password' })
	readonly password: string;
}