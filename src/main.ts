import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/localhost.pem')),
  };




  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.use(cookieParser());

  app.enableCors({
    origin: 'https://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('NotANote API')
    .setDescription('Backend API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
