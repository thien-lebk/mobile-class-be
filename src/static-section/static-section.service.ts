import { StaticItemRepository } from './../static-item/static-item.repository';
import { StaticSectionRepository } from './static-section.repository';
import { Injectable } from '@nestjs/common';
import { CreateStaticSectionDto } from './dto/create-static-section.dto';
import { UpdateStaticSectionDto } from './dto/update-static-section.dto';

@Injectable()
export class StaticSectionService {
  constructor(
    private staticSectionRepository: StaticSectionRepository,
    private staticItemRepository: StaticItemRepository,
  ) {}
  async create(createStaticSectionDto: CreateStaticSectionDto) {
    // const item = await this.staticItemRepository.create({
    //   url: createStaticSectionDto.staticItemList[0].url,
    //   description: createStaticSectionDto.staticItemList[0].description,
    // });
    const currItem = [];
    createStaticSectionDto.staticItemList.forEach(async (element) => {
      const item = await this.staticItemRepository.save({
        url: element.url,
        description: element.description,
      });
      currItem.push(item);
    });
    console.log(12323);
    
    createStaticSectionDto.staticItemList = currItem;
    createStaticSectionDto.staticSiteList = [];
    await this.staticSectionRepository.save(createStaticSectionDto);
    return 'This action adds a new staticSection';
  }

  findAll() {
    return `This action returns all staticSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staticSection`;
  }

  update(id: number, updateStaticSectionDto: UpdateStaticSectionDto) {
    return `This action updates a #${id} staticSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} staticSection`;
  }
}
