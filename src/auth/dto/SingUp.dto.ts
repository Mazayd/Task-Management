import { ApiProperty } from '@nestjs/swagger';

export class SingUpDto {
	@ApiProperty({ example: 'mazay' })
	readonly username: string;
	@ApiProperty({ example: '1234' })
	readonly password: string;
}
