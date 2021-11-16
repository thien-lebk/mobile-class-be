import { Test, TestingModule } from '@nestjs/testing';
import { StaticSectionController } from './static-section.controller';
import { StaticSectionService } from './static-section.service';

describe('StaticSectionController', () => {
  let controller: StaticSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticSectionController],
      providers: [StaticSectionService],
    }).compile();

    controller = module.get<StaticSectionController>(StaticSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
