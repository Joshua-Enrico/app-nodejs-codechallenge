import { Inject, Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { CreateTransactionRequestEventDto } from 'src/modules/transaction/dtos/create-transaction.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Producer, RecordMetadata } from 'kafkajs';
import { TRANSACTION_TOPICS } from 'src/commons/constants';

@Injectable()
export class UpdateTransacStatusReqProducer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UpdateTransacStatusReqProducer.name);
  private producer: Producer;

  constructor(
    @Inject('APPLY_FRAUD_VALIDATION_UPDATE_REQUEST') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.producer = this.kafkaClient['producer'];
  }
 
  async transactionUpdateRequestEvent(createTransactionDto: CreateTransactionRequestEventDto) {
    const { transactionId } = createTransactionDto;

    try {
      // Enviar mensaje a Kafka con confirmación de escritura en todas las réplicas
      const metadata: RecordMetadata[] = await this.producer.send({
        topic: TRANSACTION_TOPICS.VALIDATE_UPDATE_REQUEST,
        acks: -1, // espera confirmación de todas las réplicas
        messages: [
          {
            key: transactionId,
            value: JSON.stringify({
              ...createTransactionDto,
            }),
          },
        ],
      });

      this.logger.debug(`Mensaje enviado: ${transactionId}`);
      return { status: 'event published', metadata, published: true };
    } catch (error) {
      this.logger.error(`Error enviando mensaje a Kafka`, error.stack || error);
      return { status: 'error', error: error.message, published: false };
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
