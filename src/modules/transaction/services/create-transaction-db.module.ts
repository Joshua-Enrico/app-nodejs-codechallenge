import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RepositoriesModule } from '../repositories/repository.module';
import { TransactionConsumerService } from './consumers/consumer-transaction-creation-event';
import { CONFIG } from 'src/commons/constants';
import { TransactionCreationRequestReponse } from './producers/producer-creation-request-response';


@Module({
    imports: [ClientsModule.register([
        {
          name: 'CREATE_TRANSACTION_REQUEST_RESPONSE_EVENT',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'transaction-creation',
              brokers: CONFIG.kafkaBrokers,
            },
          },
        },
      ]), RepositoriesModule],
      providers: [TransactionConsumerService, TransactionCreationRequestReponse],
    exports: [],
})
export class CreateTransactionModule {}
