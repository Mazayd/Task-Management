import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpException,
	HttpStatus,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { IUser } from './interfaces';
import { IDeleteResponse, IUpdateResponse } from 'src/common';
import {
	CreateUserSwagger,
	DeleteUserSwagger,
	FindAllUserSwagger,
	FindOneUserSwagger,
	UpdateUserSwagger,
} from './user.swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiBearerAuth()
	@CreateUserSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
		return await this.usersService.create(createUserDto);
	}

	@ApiBearerAuth()
	@FindAllUserSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Get()
	async findAll(): Promise<IUser[]> {
		const result = await this.usersService.findAll();
		return result;
	}

	@ApiBearerAuth()
	@FindOneUserSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<IUser> {
		const result = await this.usersService.findOne(+id);
		if (!result) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiBearerAuth()
	@UpdateUserSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUpdateResponse> {
		const result = await this.usersService.update(+id, updateUserDto);
		if (!result.affected) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}

	@ApiBearerAuth()
	@DeleteUserSwagger()
	@UseGuards(JwtGuard, new RoleGuard('ADMIN'))
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<IDeleteResponse> {
		const result = await this.usersService.remove(+id);
		if (!result.affected) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return result;
	}
}
