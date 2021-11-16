import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateStaticSectionDto } from './dto/create-static-section.dto';
import { StaticSection } from './entities/static-section.entity';

@EntityRepository(StaticSection)
export class StaticSectionRepository extends Repository<StaticSection> {}
