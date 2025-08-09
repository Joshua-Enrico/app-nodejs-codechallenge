import { Test, TestingModule } from '@nestjs/testing';
import { GetTransactionStatusServiceTsService } from './get-transaction-status.service.ts.service';

describe('GetTransactionStatusServiceTsService', () => {
  let service: GetTransactionStatusServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTransactionStatusServiceTsService],
    }).compile();

    service = module.get<GetTransactionStatusServiceTsService>(GetTransactionStatusServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
