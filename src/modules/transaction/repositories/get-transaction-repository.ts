// src/modules/transaction/repositories/transaction.repository.ts
import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionCreateDto } from '../dtos/create-transaction-db-dto';
import { TransactionGetDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionGetRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: TransactionCreateDto): Promise<Transaction> {
    console.log('Creating transaction with data:', data);
    const response = await this.prisma.transaction.create({
      data: {
        transactionExternalId: data.transactionId,
        accountExternalIdDebit: data.accountExternalIdDebit,
        accountExternalIdCredit: data.accountExternalIdCredit,
        transferType: data.tranferTypeId,
        transactionStatusId: data.transactionStatusId,
        value: data.value,
      }
    });
    return response;
  }

async findById(transactionExternalId: string): Promise<TransactionGetDto | null> {
  const transaction = await this.prisma.transaction.findUnique({
    where: { transactionExternalId },
    include: { status: true }, // para traer el nombre del status
  });

  if (!transaction) return null;
  return TransactionGetDto.fromPrisma(transaction);
}

}
