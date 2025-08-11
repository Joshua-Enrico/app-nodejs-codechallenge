// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/transaction/emit-transaction-event.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // lo dejo en falso para evitar inconvenientes en pruebas
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
