import { Test, TestingModule } from '@nestjs/testing';
import { StaticItemService } from './static-item.service';

describe('StaticItemService', () => {
  let service: StaticItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticItemService],
    }).compile();

    service = module.get<StaticItemService>(StaticItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
