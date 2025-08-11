import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsModule } from '../services/create-request-event.module';

@Module({
    imports: [TransactionsModule],
    controllers: [TransactionsController],
})
export class TransactionsControllerModule {}
