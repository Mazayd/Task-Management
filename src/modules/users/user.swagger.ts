import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto';
import { DeleteResponseDto, UpdateResponseDto } from 'src/common';

const CreateUserSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Create user' }),
		ApiResponse({ status: 201, description: 'User created.', type: UserDto }),
		ApiResponse({ status: 403, description: 'Forbidden.' }),
	);
};

const FindAllUserSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Get all user' }),
		ApiResponse({ status: 200, description: 'Users found.', type: [UserDto] }),
		ApiResponse({ status: 404, description: 'Users not found' }),
	);
};

const FindOneUserSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Get user by id' }),
		ApiResponse({ status: 200, description: 'User found.', type: UserDto }),
		ApiResponse({ status: 404, description: 'User not found' }),
	);
};

const UpdateUserSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Update user by id' }),
		ApiResponse({ status: 200, description: 'User updated.', type: UpdateResponseDto }),
		ApiResponse({ status: 404, description: 'User not found.' }),
	);
};

const DeleteUserSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete user by id' }),
		ApiResponse({ status: 200, description: 'User deleted.', type: DeleteResponseDto }),
		ApiResponse({ status: 404, description: 'User not found.' }),
	);
};

export { CreateUserSwagger, FindAllUserSwagger, FindOneUserSwagger, UpdateUserSwagger, DeleteUserSwagger };
