import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AntiFraudeServiceTsService } from './service/anti-fraude.service.ts/anti-fraude.service.ts.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'antifraude',
          brokers: ['localhost:9092'], // cámbialo por tu broker
        },
        consumer: {
          groupId: 'antifraude-group', // importante para evitar duplicados
        },
      },
    },
  ]),],
  controllers: [AppController],
  providers: [AppService, AntiFraudeServiceTsService],
})
export class AppModule { }
