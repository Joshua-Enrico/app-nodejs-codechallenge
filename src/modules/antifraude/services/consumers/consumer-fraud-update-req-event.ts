import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { CONFIG, TRANSACTION_TOPICS } from 'src/commons/constants';
import { FraudTransactionRepository } from '../../repositories/update-transaction-repository';
import { FraudValStatusUpdateResponse } from '../producers/producer-update-transaction-response';

@Injectable()
export class UpdateTransacStatusReqConsumer implements OnModuleInit, OnModuleDestroy {


  constructor(
    private readonly fraudValStatusUpdateResponse: FraudValStatusUpdateResponse, // Assuming this is the producer service
    private readonly fraudTransactionRepository : FraudTransactionRepository
  ) {}


  private readonly logger = new Logger(UpdateTransacStatusReqConsumer.name);
  private kafka: Kafka;
  private consumer: Consumer;

  private readonly MAX_PROCESS_RETRIES = 2;
  private readonly MAX_COMMIT_RETRIES = 3;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'fraud-validator-consumer',
      brokers: CONFIG.kafkaBrokers,
    });

    this.consumer = this.kafka.consumer({ groupId: 'update-transaction-status' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: TRANSACTION_TOPICS.VALIDATE_UPDATE_REQUEST, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { topic, partition, message } = payload;
        const offset = message.offset;
        const key = message.key?.toString();
        const value: any = message.value?.toString();

        this.logger.log(`Received message key=${key} topic=${topic} partition=${partition} offset=${offset}`);

        let processed = false;
        for (let attempt = 1; attempt <= this.MAX_PROCESS_RETRIES + 1 && !processed; attempt++) {
          try {
            // Aquí tu lógica idempotente con el mensaje
            // Por ejemplo, parsear value y procesar
            const data = JSON.parse(value);
            this.logger.log(`Processing message, attempt ${attempt}: ${JSON.stringify(data)}`);

            await this.fraudTransactionRepository.updateStatus(data.transactionId, data.transactionStatusId);
            
            await this.fraudValStatusUpdateResponse.produceTransactionEvent({
              transactionId: data.transactionId,
              message: 'Transaction validated successfully',
            });

            processed = true;
          } catch (error) {
            this.logger.error(`Error procesando mensaje, intento ${attempt}: ${error.message || error}`);
            if (attempt > this.MAX_PROCESS_RETRIES) {
              this.logger.warn('Alcanzado máximo reintentos de procesamiento. Enviar a DLQ o manejar error.');
              break;
            }
            await new Promise(res => setTimeout(res, 1000));
          }
        }

        if (!processed) {
          this.logger.error('No se pudo procesar mensaje, saltando commit.');
          return;
        }

        // KafkaJS maneja commit automático o manual, aquí ejemplo manual:
        let committed = false;
        for (let attempt = 1; attempt <= this.MAX_COMMIT_RETRIES + 1 && !committed; attempt++) {
          try {
            await this.consumer.commitOffsets([
              { topic, partition, offset: (Number(offset) + 1).toString() },
            ]);
            committed = true;
            this.logger.log(`Offset confirmado para offset=${offset}`);
          } catch (error) {
            this.logger.error(`Error en commit, intento ${attempt}: ${error.message || error}`);
            if (attempt > this.MAX_COMMIT_RETRIES) {
              this.logger.error('No se pudo confirmar offset tras varios intentos. Intervención manual requerida.');
              // aqui se puede enviar a la dql de este topic, no se implementa por tiempo
              break;
            }
            await new Promise(res => setTimeout(res, 1000));
          }
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log('Kafka consumer disconnected');
  }
}
