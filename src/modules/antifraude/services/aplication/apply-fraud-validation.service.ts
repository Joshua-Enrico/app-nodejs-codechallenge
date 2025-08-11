import { Injectable } from '@nestjs/common';
import { TransactionFraudDto } from '../../dtos/transaction.dto';
import { TRANSACTION_STATUS } from 'src/commons/constants';

@Injectable()
export class ApplyFraudValidationService {

  constructor(
  ) { }


  async apllyFraudValidation(transaction: TransactionFraudDto): Promise<any> {
    // if value more than 1000 apply fraud validation set status to rejected if not set status to aproved
    const aproved = transaction.value <= 1000;
    const transactionStatusId = aproved ? TRANSACTION_STATUS.APPROVED : TRANSACTION_STATUS.REJECTED;
    console.log('Applying fraud validation:', aproved ? 'APPROVED' : 'REJECTED')

    return {
      transactionId: transaction.transactionId,
      transactionStatusId,
      status: aproved ? 'APPROVED' : 'REJECTED',
    }
  }

}
