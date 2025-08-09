import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTransactionDto } from '../../dto/create-transaction.dto/create-transaction.dto';
import { CreateTransactionResponse } from '../../models/transaction.model/transaction.model';

@Resolver()
export class TransactionsResolver {

    @Query(() => String)
    sayHello(): string {
      return 'Hello, GraphQL!';
    }

    @Mutation(() => CreateTransactionResponse)
    async createTransaction(@Args({name: 'input', type: () => CreateTransactionDto }) data: CreateTransactionDto): Promise<any> {
     
        console.log('data', data);
        return {
          message: 'Transaction created successfully',
          status: 'success',
          transactionId: '123e4567-e89b-12d3-a456-426614174000',
        };
    }

}
