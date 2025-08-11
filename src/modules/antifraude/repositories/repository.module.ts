// repositorios.module.ts
import { Module } from '@nestjs/common';
import { FraudTransactionRepository } from './update-transaction-repository';
@Module({
  providers: [FraudTransactionRepository],
  exports: [FraudTransactionRepository],
})
export class FraudRepositoriesModule {}
