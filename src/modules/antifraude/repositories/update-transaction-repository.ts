// src/modules/transaction/repositories/transaction.repository.ts
import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FraudTransactionRepository {
  constructor(private readonly prisma: PrismaService) {}



async updateStatus(transactionId: string, transactionStatusId: number): Promise<Transaction> {
  console.log('Updating transaction status:', { transactionId, transactionStatusId });
    const response = await this.prisma.transaction.update({
      where: { transactionExternalId: transactionId },
      data: { transactionStatusId: transactionStatusId },
    });
    return response;
  }

}
