import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { StaticItem } from './entities/static-item.entity';

@EntityRepository(StaticItem)
export class StaticItemRepository extends Repository<StaticItem> {}
