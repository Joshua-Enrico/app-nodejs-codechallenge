import { Injectable } from '@nestjs/common';
import { TransactionDto } from '../../dtos/transaction.dto';
import { v4 as uuidv4 } from 'uuid';
import { TransactionCreatedProducerService } from '../producers/producer-creation-request';
import { TRANSACTION_MESSAGES } from 'src/commons/constants';

@Injectable()
export class CreateTransactionServiceTsService {

  constructor(
    private readonly transactionCreatedProducerService: TransactionCreatedProducerService
  ) { }

  async produceTransactionEvent(createTransactionDto: TransactionDto): Promise<any> {

    const transactionId = uuidv4(); // Generate a unique transaction ID
    console.log('Producing transaction event:', {
      transactionId,
      ...createTransactionDto,
    });

    const eventReponse = await this.transactionCreatedProducerService.produceTransactionEvent({
      transactionId,
      ...createTransactionDto,
    });

    return eventReponse.published ?
      { status: TRANSACTION_MESSAGES.CREATED_SUCCESS, transactionId } :
      { status: TRANSACTION_MESSAGES.CREATED_FAIL };
  }

}
