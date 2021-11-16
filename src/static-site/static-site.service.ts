import { Injectable } from '@nestjs/common';
import { CreateStaticSiteDto } from './dto/create-static-site.dto';
import { UpdateStaticSiteDto } from './dto/update-static-site.dto';

@Injectable()
export class StaticSiteService {
  create(createStaticSiteDto: CreateStaticSiteDto) {
    return 'This action adds a new staticSite';
  }

  findAll() {
    return `This action returns all staticSite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staticSite`;
  }

  update(id: number, updateStaticSiteDto: UpdateStaticSiteDto) {
    return `This action updates a #${id} staticSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} staticSite`;
  }
}
