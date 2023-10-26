import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({ example: 'jwt_token' })
	readonly access_token: string;
}
