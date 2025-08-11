import { Injectable, Logger } from '@nestjs/common';
import { TransactionFraudDto } from '../../dtos/transaction.dto';
import { TRANSACTION_STATUS } from 'src/commons/constants';

@Injectable()
export class ApplyFraudValidationService {
  private readonly logger = new Logger(ApplyFraudValidationService.name);

  constructor() {}

  async apllyFraudValidation(transaction: TransactionFraudDto): Promise<any> {
    const aproved = transaction.value <= 1000;
    const transactionStatusId = aproved ? TRANSACTION_STATUS.APPROVED : TRANSACTION_STATUS.REJECTED;
    this.logger.log(`Applying fraud validation: ${aproved ? 'APPROVED' : 'REJECTED'}`);

    return {
      transactionId: transaction.transactionId,
      transactionStatusId,
      status: aproved ? 'APPROVED' : 'REJECTED',
    };
  }
}
