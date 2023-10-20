import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
	@ApiProperty({ example: [] })
	readonly raw: [];
	@ApiProperty({ example: 1 })
	readonly affected: number;
}
