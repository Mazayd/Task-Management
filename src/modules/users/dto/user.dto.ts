import { ApiProperty } from '@nestjs/swagger';
import { UserRoleDto } from 'src/modules/user-roles';

export class UserDto {
	@ApiProperty({ example: 1, description: 'User id' })
	readonly id: number;
	@ApiProperty({ example: 'mazay', description: 'Username' })
	readonly username: string;
	@ApiProperty({ example: '2023-10-18T08:23:15.653Z', description: 'Date created' })
	readonly createAt: Date;
	@ApiProperty({ example: UserRoleDto, description: 'UserRole' })
	readonly role?: UserRoleDto;
}
