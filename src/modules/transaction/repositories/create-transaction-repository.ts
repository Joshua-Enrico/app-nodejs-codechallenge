// src/modules/transaction/repositories/transaction.repository.ts
import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionCreateDto } from '../dtos/create-transaction-db-dto';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

async create(data: TransactionCreateDto): Promise<Transaction> {
  console.log('Creating transaction with data:', data);
    const response = await this.prisma.transaction.create({ data: {
      transactionExternalId: data.transactionId,
      accountExternalIdDebit: data.accountExternalIdDebit,
      accountExternalIdCredit: data.accountExternalIdCredit,
      transferType: data.tranferTypeId,
      transactionStatusId: data.transactionStatusId,
      value: data.value,
    }});
    return response;
}
//   async updateStatus(id: string, status: string): Promise<Transaction> {
//     return this.prisma.transaction.update({
//       where: { id },
//       data: { status },
//     });
//   }

//   async findById(id: string): Promise<Transaction | null> {
//     return this.prisma.transaction.findUnique({ where: { id } });
//   }
}
