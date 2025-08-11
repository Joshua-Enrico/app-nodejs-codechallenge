import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { FraudValidationModule } from './modules/antifraude/fraud-validation.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Crear app Nest normal (HTTP u otro tipo)
  const app = await NestFactory.create(FraudValidationModule);

  // Aquí no usas createMicroservice con Kafka porque Kafka lo manejas tú manualmente
  // Los servicios internos (como TransactionConsumerService) harán el connect, subscribe, run, etc.

  // Manejo global de errores no capturados
  process.on('uncaughtException', (e) => logger.error('Uncaught Exception', e));
  process.on('unhandledRejection', (e) => logger.error('Unhandled Rejection', e));

  await app.listen(0);
  logger.log('App started');
}

bootstrap();
