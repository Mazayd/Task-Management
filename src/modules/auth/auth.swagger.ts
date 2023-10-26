import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/common';
import { LoginDto } from './dto';

const RegisterUserSwagger = (): any => {
	return applyDecorators(
		ApiResponse({ status: 201, description: 'User created.', type: SuccessMessageDto }),
		ApiResponse({ status: 400 }),
		ApiResponse({ status: 404 }),
	);
};

const LoginUserSwagger = (): any => {
	return applyDecorators(
		ApiResponse({ status: 201, description: 'User created.', type: LoginDto }),
		ApiResponse({ status: 400 }),
		ApiResponse({ status: 404 }),
	);
};

export { RegisterUserSwagger, LoginUserSwagger };
