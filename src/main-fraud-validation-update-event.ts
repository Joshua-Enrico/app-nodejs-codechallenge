import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { FraudValidationUpdateStatusModule } from './modules/antifraude/fraud-update-status.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Crear app Nest normal (HTTP u otro tipo)
  const app = await NestFactory.create(FraudValidationUpdateStatusModule);


  // Manejo global de errores no capturados
  process.on('uncaughtException', (e) => logger.error('Uncaught Exception', e));
  process.on('unhandledRejection', (e) => logger.error('Unhandled Rejection', e));

  await app.listen(0);
  logger.log('App started');
}

bootstrap();
