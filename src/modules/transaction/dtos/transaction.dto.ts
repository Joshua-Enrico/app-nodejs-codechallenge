
export class TransactionDto {
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: number;
  value: number;
}

export class TransactionGetDto {
  transactionExternalId: string;
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
  static fromPrisma(transaction: any): TransactionGetDto {
    return new TransactionGetDto({
      transactionExternalId: transaction.transactionExternalId,
      transferType: transaction.transferType,
      transactionStatusName: transaction.status?.name || 'unknown',
      value: Number(transaction.value), // Decimal a number
      createdAt: transaction.createdAt,
    });
  }
}
