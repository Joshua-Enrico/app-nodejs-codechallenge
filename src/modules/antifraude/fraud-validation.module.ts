import { Module } from '@nestjs/common';
import { ApplyFraudValidationModule } from './services/fraud-transaction-val-request-event';

@Module({
  imports: [
    ApplyFraudValidationModule,
  ],
})
export class FraudValidationModule { }
