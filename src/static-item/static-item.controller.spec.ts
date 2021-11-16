import { Test, TestingModule } from '@nestjs/testing';
import { StaticItemController } from './static-item.controller';
import { StaticItemService } from './static-item.service';

describe('StaticItemController', () => {
  let controller: StaticItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticItemController],
      providers: [StaticItemService],
    }).compile();

    controller = module.get<StaticItemController>(StaticItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
