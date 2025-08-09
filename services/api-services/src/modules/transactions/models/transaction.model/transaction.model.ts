import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class CreateTransactionResponse {

    @Field(() => String)
    message: string;
    @Field(() => String)
    status: string;
    @Field(() => String)
    transactionId: string;
}


