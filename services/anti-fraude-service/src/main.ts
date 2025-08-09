// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Creamos la aplicación como microservicio Kafka
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'antifraude-service',
        brokers: ['localhost:9092'], // Ajusta a tu broker real
      },
      consumer: {
        groupId: 'antifraude-group', // ID único para este servicio
      },
    },
  });

  await app.listen();
  console.log('✅ Servicio Antifraude (Kafka Consumer & Producer) iniciado');
}

bootstrap();
