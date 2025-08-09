import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdateServiceTsService } from './service/update.service.ts/update.service.ts.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UpdateServiceTsService],
})
export class AppModule {}
