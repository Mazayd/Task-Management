import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel, Users } from './user.model';
import { Tasks } from 'src/task/task.model';

@Module({
	imports: [TypeOrmModule.forFeature([Users, Tasks])],
	exports: [],
	providers: [UserService, UserModel],
	controllers: [UserController],
})
export class UserModule {}
