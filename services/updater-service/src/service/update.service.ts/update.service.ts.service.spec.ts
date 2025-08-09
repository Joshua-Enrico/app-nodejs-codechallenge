import { Test, TestingModule } from '@nestjs/testing';
import { UpdateServiceTsService } from './update.service.ts.service';

describe('UpdateServiceTsService', () => {
  let service: UpdateServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateServiceTsService],
    }).compile();

    service = module.get<UpdateServiceTsService>(UpdateServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
