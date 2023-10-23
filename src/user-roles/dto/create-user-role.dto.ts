import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
	@ApiProperty({ example: 'ADMIN', description: 'User role' })
	readonly value: string;
	@ApiProperty({ example: 'Admonistrator', description: 'Description user role' })
	readonly description: string;
}
