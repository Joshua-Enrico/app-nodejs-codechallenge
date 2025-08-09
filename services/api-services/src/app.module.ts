import { NestFactory } from '@nestjs/core';
import { ServiceModule } from './service.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceModule, { cors: true });

  // Configuración global mínima
  app.setGlobalPrefix('api'); // Prefijo de rutas: /api/*
  
  await app.listen(3000);
  console.log(`🚀 API escuchando en http://localhost:3000/api`);
}
bootstrap();
