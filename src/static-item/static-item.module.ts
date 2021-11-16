import { Module } from '@nestjs/common';
import { StaticItemService } from './static-item.service';
import { StaticItemController } from './static-item.controller';

@Module({
  controllers: [StaticItemController],
  providers: [StaticItemService]
})
export class StaticItemModule {}
