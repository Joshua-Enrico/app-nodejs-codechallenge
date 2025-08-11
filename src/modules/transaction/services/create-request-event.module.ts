import { Module } from '@nestjs/common';
import { CreateTransactionServiceTsService } from './aplication/create-transaction-event.service';
import { TransactionCreatedProducerService  } from './producers/producer-creation-request';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONFIG } from 'src/commons/constants';
import { GetTransactionService } from './aplication/get-transaction.service';
import { RepositoriesModule } from '../repositories/repository.module';


@Module({
    imports: [ClientsModule.register([
        {
          name: 'CREATE_TRANSACTION_REQUEST_EVENT',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'transaction-producer',
              brokers: CONFIG.kafkaBrokers,
            },
          },
        },
      ]), RepositoriesModule],
    providers: [CreateTransactionServiceTsService, GetTransactionService, TransactionCreatedProducerService ],
    exports: [CreateTransactionServiceTsService, GetTransactionService, TransactionCreatedProducerService],
})
export class TransactionsModule {}
