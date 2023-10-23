import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserRole } from './user-roles/entities/user-role.entity';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			entities: [Users, UserRole],
			synchronize: true,
		}),
		UsersModule,
		UserRolesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
