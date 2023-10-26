import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UserRole } from 'src/modules/user-roles/entities/user-role.entity';
import { PasswordHash } from './helpers/password-hash';
import { UserRolesModule } from 'src/modules/user-roles/user-roles.module';
import { UserRepository } from './user.repository';
import { Tasks } from '../tasks/entities/task.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Users, UserRole, Tasks]), UserRolesModule],
	controllers: [UsersController],
	providers: [UsersService, UserRepository, PasswordHash],
	exports: [UsersService, PasswordHash],
})
export class UsersModule {}
