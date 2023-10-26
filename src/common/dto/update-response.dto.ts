import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponseDto {
	@ApiProperty({ example: [] })
	readonly generatedMaps: [];
	@ApiProperty({ example: [] })
	readonly raw: [];
	@ApiProperty({ example: 1 })
	readonly affected: number;
}
