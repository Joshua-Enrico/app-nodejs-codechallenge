import { Module } from '@nestjs/common';
import { TransactionsControllerModule } from './controllers/transactions.module';
import { TransactionsModule } from './services/create-request-event.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [TransactionsControllerModule, TransactionsModule, PrismaModule],
})
export class AppModule { }
