import { Test, TestingModule } from '@nestjs/testing';
import { StaticSiteService } from './static-site.service';

describe('StaticSiteService', () => {
  let service: StaticSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticSiteService],
    }).compile();

    service = module.get<StaticSiteService>(StaticSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
