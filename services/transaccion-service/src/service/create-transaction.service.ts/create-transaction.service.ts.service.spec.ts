import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionServiceTsService } from './create-transaction.service.ts.service';

describe('CreateTransactionServiceTsService', () => {
  let service: CreateTransactionServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTransactionServiceTsService],
    }).compile();

    service = module.get<CreateTransactionServiceTsService>(CreateTransactionServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
