import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRoleDto } from './dto';
import { DeleteResponseDto, UpdateResponseDto } from 'src/common';

const CreateUserRoleSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Create user role' }),
		ApiResponse({ status: 201, description: 'User created.', type: UserRoleDto }),
		ApiResponse({ status: 403, description: 'Forbidden.' }),
	);
};

const FindAllUserRolesSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Get all user roles' }),
		ApiResponse({ status: 201, description: 'User roles found', type: [UserRoleDto] }),
		ApiResponse({ status: 403, description: 'User roles not found.' }),
	);
};

const FindOneUserRoleSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Get user role by id' }),
		ApiResponse({ status: 201, description: 'User role found.', type: UserRoleDto }),
		ApiResponse({ status: 403, description: 'User role not found.' }),
	);
};

const UpdateUserRoleSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Update user role' }),
		ApiResponse({ status: 201, description: 'User role updated.', type: UpdateResponseDto }),
		ApiResponse({ status: 403, description: 'User role not found.' }),
	);
};

const DeleteUserRoleSwagger = (): any => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete user role' }),
		ApiResponse({ status: 201, description: 'User role deleted.', type: DeleteResponseDto }),
		ApiResponse({ status: 403, description: 'User role not found.' }),
	);
};

export {
	CreateUserRoleSwagger,
	FindAllUserRolesSwagger,
	FindOneUserRoleSwagger,
	UpdateUserRoleSwagger,
	DeleteUserRoleSwagger,
};
