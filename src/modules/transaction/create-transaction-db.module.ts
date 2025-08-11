import { Module } from '@nestjs/common';
import { CreateTransactionModule } from './services/create-transaction-db.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    CreateTransactionModule, 
    PrismaModule,
  ],
})
export class AppCreateTransactionModule { }
