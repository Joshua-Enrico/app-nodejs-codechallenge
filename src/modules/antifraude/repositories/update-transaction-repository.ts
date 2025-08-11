// src/modules/transaction/repositories/transaction.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FraudTransactionRepository {
  private readonly logger = new Logger(FraudTransactionRepository.name);
  constructor(private readonly prisma: PrismaService) {}



  async updateStatus(transactionId: string, transactionStatusId: number): Promise<Transaction> {
    this.logger.log(`Updating transaction status: ${JSON.stringify({ transactionId, transactionStatusId })}`);
    const response = await this.prisma.transaction.update({
      where: { transactionExternalId: transactionId },
      data: { transactionStatusId: transactionStatusId },
    });
    return response;
  }

}
