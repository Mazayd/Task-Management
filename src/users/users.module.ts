import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { PasswordHash } from './helpers/password-hash';
import { UserRolesModule } from 'src/user-roles/user-roles.module';

@Module({
	imports: [TypeOrmModule.forFeature([Users, UserRole]), UserRolesModule],
	controllers: [UsersController],
	providers: [UsersService, PasswordHash],
	exports: [UsersService, PasswordHash],
})
export class UsersModule {}
