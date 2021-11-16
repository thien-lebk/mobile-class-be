import { Module } from '@nestjs/common';
import { StaticSectionService } from './static-section.service';
import { StaticSectionController } from './static-section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticSectionRepository } from './static-section.repository';
import { StaticItemRepository } from 'src/static-item/static-item.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaticSectionRepository, StaticItemRepository]),
  ],
  controllers: [StaticSectionController],
  providers: [StaticSectionService],
})
export class StaticSectionModule {}
