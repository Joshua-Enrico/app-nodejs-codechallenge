import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

/**
 * @description DTO for creating a transaction
 * @class CreateTransactionDto
 * @property {string} accountExternalIdDebit - The external ID of the debit account (UUID v4, required)
 * @property {string} accountExternalIdCredit - The external ID of the credit account (UUID v4, required)
 * @property {number} tranferTypeId - The ID of the transfer type (required)
 * @property {number} value - The value of the transaction (required)
 * @example
 * {
 *   accountExternalIdDebit: "123e4567-e89b-12d3-a456-426614174000",
 *   accountExternalIdCredit: "123e4567-e89b-12d3-a456-426614174001",
 *   tranferTypeId: 1,
 *   value: 100.50
 * }
 */
@InputType()
export class CreateTransactionDto {
    
    @IsNotEmpty()
    @Field({ nullable: false })
    @IsUUID('4')
    accountExternalIdDebit: string;

    @IsNotEmpty({ message: 'accountExternalIdCredit ERROR : VV3' })
    @Field({ nullable: false })
    @IsUUID('4', { message: 'accountExternalIdCredit ERROR : VV4' })
    accountExternalIdCredit: string;

    @IsNotEmpty({ message: 'amount ERROR : VV5' })
    @IsNumber({}, { message: 'amount ERROR : VV5' })
    @Field({ nullable: false })
    tranferTypeId: number;

    @IsNotEmpty({ message: 'amount ERROR : VV6' })
    @IsNumber({}, { message: 'amount ERROR : VV6' })
    @Field({ nullable: false })
    value: number;
}
