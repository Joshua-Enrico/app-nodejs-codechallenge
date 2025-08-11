

import { IsString, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
export class TransactionDto {
  @IsUUID()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  accountExternalIdDebit: string;

  @IsString()
  @IsNotEmpty()
  accountExternalIdCredit: string;

}
export class TransactionGetDto {

  @IsNumber()
  transactionExternalId: string;

  @IsNumber()
  transactionType: { name: string };
  transactionStatus: { name: string };
  value: number;
  createdAt: Date;

  constructor(params: {
    transactionExternalId: string;
    transferType: number; // se mapea a transactionType.name
    transactionStatusName: string;
    value: number;
    createdAt: Date;
  }) {
    this.transactionExternalId = params.transactionExternalId;

    // Para transactionType, asumo que el nombre se deriva del transferType como string
    this.transactionType = { name: params.transferType.toString() };

    this.transactionStatus = { name: params.transactionStatusName };
    this.value = params.value;
    this.createdAt = params.createdAt;
  }

  // Método estático para construir DTO desde objeto Prisma con include de status
  static fromPrisma(transaction: { transactionExternalId: string; transferType: number; status?: { name: string }; value: any; createdAt: Date }): TransactionGetDto {
    return new TransactionGetDto({
      transactionExternalId: transaction.transactionExternalId,
      transferType: transaction.transferType,
      transactionStatusName: transaction.status?.name || 'unknown',
      value: Number(transaction.value), // Decimal a number
      createdAt: transaction.createdAt,
    });
  }
}
