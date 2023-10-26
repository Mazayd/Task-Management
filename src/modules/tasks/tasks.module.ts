import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Users, UsersModule } from '../users';
import { TasksRepository } from './tasks.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Tasks, Users]), UsersModule],
	controllers: [TasksController],
	providers: [TasksService, TasksRepository],
})
export class TasksModule {}
