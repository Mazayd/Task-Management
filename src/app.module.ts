import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, UsersModule } from './modules/users';
import { UserRole, UserRolesModule } from './modules/user-roles';
import { JwtModule } from '@nestjs/jwt';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth';
import { Tasks } from './modules/tasks/entities/task.entity';

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
			entities: [Users, UserRole, Tasks],
			synchronize: true,
		}),
		JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
		UsersModule,
		UserRolesModule,
		AuthModule,
		TasksModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
