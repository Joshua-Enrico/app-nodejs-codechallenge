import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UpdateFraudValRequestEventModule } from './services/update-fraud-val-response-event.module';

@Module({
  imports: [
    UpdateFraudValRequestEventModule,
    PrismaModule,
  ],
})
export class FraudValidationUpdateStatusModule { }
