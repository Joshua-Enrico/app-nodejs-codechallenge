import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONFIG } from 'src/commons/constants';
import { ApplyFraudValidationService } from './aplication/apply-fraud-validation.service';
import { UpdateTransacStatusReqProducer } from './producers/producer-fraud-val-transaction-response';
import { ApplyFraudValidationConsumer } from './consumers/consumer-fraud-validation-req-event';


@Module({
    imports: [ClientsModule.register([
        {
          name: 'APPLY_FRAUD_VALIDATION_UPDATE_REQUEST',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'transaction-creation',
              brokers: CONFIG.kafkaBrokers,
            },
          },
        },
      ])],
      providers: [ApplyFraudValidationConsumer, ApplyFraudValidationService, UpdateTransacStatusReqProducer],
    exports: [],
})
export class ApplyFraudValidationModule {}
