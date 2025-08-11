// repositorios.module.ts
import { Module } from '@nestjs/common';
import { TransactionRepository } from './create-transaction-repository';
import { TransactionGetRepository } from './get-transaction-repository';
@Module({
  providers: [TransactionRepository, TransactionGetRepository],
  exports: [TransactionRepository, TransactionGetRepository],
})
export class RepositoriesModule {}
