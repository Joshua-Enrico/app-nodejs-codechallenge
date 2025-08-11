import { Module } from '@nestjs/common';
import { FraudValStatusUpdateResponse } from './producers/producer-update-transaction-response';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONFIG } from 'src/commons/constants';
import { UpdateTransacStatusReqConsumer } from './consumers/consumer-fraud-update-req-event';
import { FraudRepositoriesModule } from '../repositories/repository.module';


@Module({
    imports: [ClientsModule.register([
        {
          name: 'UPDATE_FRAUD_VAL_REQUEST_RESPONSE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'transaction-producer',
              brokers: CONFIG.kafkaBrokers,
            },
          },
        },
      ]), FraudRepositoriesModule],
    providers: [FraudValStatusUpdateResponse, UpdateTransacStatusReqConsumer, FraudValStatusUpdateResponse],
})
export class UpdateFraudValRequestEventModule {}
