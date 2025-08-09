  // main.ts
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { MicroserviceOptions, Transport } from '@nestjs/microservices';

  async function bootstrap() {
    // App HTTP normal
    const app = await NestFactory.create(AppModule);

    // Microservicio Kafka
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'], // o tus brokers reales
        },
        consumer: {
          groupId: 'transacciones-consumer', // único por microservicio
        },
      },
    });

    // Arrancar ambos
    await app.startAllMicroservices();
    await app.listen(3000);
    console.log('HTTP server en http://localhost:3000');
  }

  bootstrap();
