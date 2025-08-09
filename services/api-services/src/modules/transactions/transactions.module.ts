import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions/transactions.service';
import { TransactionsResolver } from './resolvers/transactions/transactions.resolver';

@Module({
  providers: [TransactionsService, TransactionsResolver]
})
export class TransactionsModule {}
