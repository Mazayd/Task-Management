import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/SingUp.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserSwagger, RegisterUserSwagger } from './auth.swagger';
import { ILogin, ISuccessMessage } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@RegisterUserSwagger()
	@Post('register')
	async register(@Body() data: SingUpDto): Promise<ISuccessMessage> {
		await this.authService.register(data);
		return { success: true };
	}

	@ApiOperation({ summary: 'Login user' })
	@LoginUserSwagger()
	@Post('login')
	async login(@Body() data: SingUpDto): Promise<ILogin> {
		const result = await this.authService.login(data);
		return result;
	}
}
