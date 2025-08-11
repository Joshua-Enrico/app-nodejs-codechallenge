import { Inject, Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer, RecordMetadata } from 'kafkajs';
import { TRANSACTION_STATUS, TRANSACTION_TOPICS } from 'src/commons/constants';

@Injectable()
export class TransactionCreatedProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TransactionCreatedProducerService.name);
  private producer: Producer;

  constructor(
    @Inject('CREATE_TRANSACTION_REQUEST_EVENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Conecta el cliente de Kafka
    await this.kafkaClient.connect();

    // Usa el producer interno de KafkaJS que Nest crea
    this.producer = this.kafkaClient['producer'];
  }

  async produceTransactionEvent(createTransactionDto: any) {
    const { transactionId } = createTransactionDto;
    const transactionStatusId = TRANSACTION_STATUS.PENDING

    try {
      // Enviar mensaje a Kafka con confirmación de escritura en todas las réplicas
      const metadata: RecordMetadata[] = await this.producer.send({
        topic: TRANSACTION_TOPICS.CREATED_REQUEST,
        acks: -1, // espera confirmación de todas las réplicas
        messages: [
          {
            key: transactionId,
            value: JSON.stringify({
              transactionId,
              transactionStatusId,
              ...createTransactionDto,
            }),
          },
        ],
      });

      this.logger.debug(`Mensaje enviado a topic transactions.created: ${transactionId}`);
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
