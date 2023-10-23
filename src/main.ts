import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Task management')
		.setDescription('Description of the pet project API: Task management.')
		.setVersion('1.0')
		.addTag('mazay_daddy')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(PORT, () => console.log('Server listen port: ' + PORT));
}
bootstrap();
