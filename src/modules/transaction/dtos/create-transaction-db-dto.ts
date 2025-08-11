export type TransactionCreateDto = {
  transactionId: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: number;
  transactionStatusId: number;
  value: number;
};
