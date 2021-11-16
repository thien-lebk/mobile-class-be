import { Injectable } from '@nestjs/common';
import { CreateStaticItemDto } from './dto/create-static-item.dto';
import { UpdateStaticItemDto } from './dto/update-static-item.dto';

@Injectable()
export class StaticItemService {
  create(createStaticItemDto: CreateStaticItemDto) {
    return 'This action adds a new staticItem';
  }

  findAll() {
    return `This action returns all staticItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staticItem`;
  }

  update(id: number, updateStaticItemDto: UpdateStaticItemDto) {
    return `This action updates a #${id} staticItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} staticItem`;
  }
}
