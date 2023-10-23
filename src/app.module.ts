import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserRole } from './user-roles/entities/user-role.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

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
		JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
		UsersModule,
		UserRolesModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
