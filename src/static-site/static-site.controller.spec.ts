import { Test, TestingModule } from '@nestjs/testing';
import { StaticSiteController } from './static-site.controller';
import { StaticSiteService } from './static-site.service';

describe('StaticSiteController', () => {
  let controller: StaticSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticSiteController],
      providers: [StaticSiteService],
    }).compile();

    controller = module.get<StaticSiteController>(StaticSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
