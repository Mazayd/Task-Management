import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
	@ApiProperty({ example: 1, description: 'Id user role' })
	readonly id: number;
	@ApiProperty({ example: 'ADMIN', description: 'User role' })
	readonly value: string;
	@ApiProperty({ example: 'Admonistrator', description: 'Description user role' })
	readonly description: string;
}
