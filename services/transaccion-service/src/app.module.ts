import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateTransactionServiceTsService } from './service/create-transaction.service.ts/create-transaction.service.ts.service';
import { GetTransactionStatusServiceTsService } from './service/get-transaction-status.service.ts/get-transaction-status.service.ts.service';

@Module({
  imports: [ ClientsModule.register([
      {
        name: 'ANTIFRAUDE_KAFKA', // Token para inyectar el cliente
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'antifraude-producer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'antifraude-producer-group', // puede ser distinto al consumer listener
          },
        },
      },
    ]),],
  controllers: [AppController],
  providers: [AppService, CreateTransactionServiceTsService, GetTransactionStatusServiceTsService],
})
export class AppModule {}
