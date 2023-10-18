import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';
import { Users } from 'src/user/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModel, Tasks } from './task.model';

@Module({
	imports: [TypeOrmModule.forFeature([Users, Tasks])],
	exports: [],
	providers: [TaskService, TaskModel],
	controllers: [TaskController],
})
export class TaskModule {}
