import { Test, TestingModule } from '@nestjs/testing';
import { AntiFraudeServiceTsService } from './anti-fraude.service.ts.service';

describe('AntiFraudeServiceTsService', () => {
  let service: AntiFraudeServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntiFraudeServiceTsService],
    }).compile();

    service = module.get<AntiFraudeServiceTsService>(AntiFraudeServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
