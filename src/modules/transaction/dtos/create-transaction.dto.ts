import { IsUUID, IsNumber, IsPositive, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  @IsNotEmpty()
  accountExternalIdCredit: string;

  @IsNumber()
  @IsNotEmpty()
  tranferTypeId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;
}

export class CreateTransactionEmittDto {
  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  @IsNotEmpty()
  transactionId: string;

  @IsUUID()
  @IsNotEmpty()
  accountExternalIdCredit: string;

  @IsNumber()
  @IsNotEmpty()
  tranferTypeId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;
}


export class CreateTransactionEventDto {

  @IsUUID()
  transactionId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  message: string;

}


export class CreateTransactionRequestEventDto {

  @IsUUID()
  transactionId: string;

  @IsUUID()
  transactionStatusId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

}
export class ValidateTransactionRequestEventDto {

  @IsUUID()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

}
