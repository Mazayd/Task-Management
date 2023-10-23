import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/SingUp.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/dto/success-message.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@ApiResponse({ status: 201, description: 'User created.', type: SuccessMessageDto })
	@ApiResponse({ status: 400 })
	@ApiResponse({ status: 404 })
	@Post('register')
	async register(@Body() data: SingUpDto) {
		await this.authService.register(data);
		return { success: true };
	}

	@ApiOperation({ summary: 'Login user' })
	@ApiResponse({ status: 201, description: 'User created.', type: LoginDto })
	@ApiResponse({ status: 400 })
	@ApiResponse({ status: 404 })
	@Post('login')
	async login(@Body() data: SingUpDto) {
		const result = await this.authService.login(data);
		return result;
	}
}
