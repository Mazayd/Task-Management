import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/user.model';
import { UserModule } from './user/user.module';

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
			entities: [Users],
			synchronize: true,
		}),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
