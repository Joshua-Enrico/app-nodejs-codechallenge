import { Injectable } from '@nestjs/common';
import { TransactionGetRepository } from '../../repositories/get-transaction-repository';

@Injectable()
export class GetTransactionService {

    constructor(
        private readonly transactionGetRepository: TransactionGetRepository
    ) { }

    async getTransactionById(transactionId: string): Promise<any> {
        console.log('Fetching transaction with ID:', transactionId);
        const transaction = await this.transactionGetRepository.findById(transactionId);
        if (!transaction) {
            console.log('Transaction not found:', transactionId);
            return { status: 'NOT_FOUND', message: 'Transaction not found' };
        }
        console.log('Transaction found:', transaction);
        return {
            status: 'FOUND',
            data: transaction,
        };

    }
}
