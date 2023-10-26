import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserRolesRepository } from './user-roles.repository';

@Module({
	imports: [TypeOrmModule.forFeature([UserRole])],
	controllers: [UserRolesController],
	providers: [UserRolesService, UserRolesRepository],
	exports: [UserRolesService],
})
export class UserRolesModule {}
