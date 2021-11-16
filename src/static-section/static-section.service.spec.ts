import { Test, TestingModule } from '@nestjs/testing';
import { StaticSectionService } from './static-section.service';

describe('StaticSectionService', () => {
  let service: StaticSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticSectionService],
    }).compile();

    service = module.get<StaticSectionService>(StaticSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
