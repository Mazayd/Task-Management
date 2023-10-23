import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessageDto {
	@ApiProperty({ example: true })
	readonly success: boolean;
}
