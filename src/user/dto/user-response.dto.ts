import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
	@ApiProperty({ example: [] })
	readonly raw: [];
	@ApiProperty({ example: 1 })
	readonly affected: number;
}
