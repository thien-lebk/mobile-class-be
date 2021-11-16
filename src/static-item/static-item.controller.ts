import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaticItemService } from './static-item.service';
import { CreateStaticItemDto } from './dto/create-static-item.dto';
import { UpdateStaticItemDto } from './dto/update-static-item.dto';

@Controller('static-item')
export class StaticItemController {
  constructor(private readonly staticItemService: StaticItemService) {}

  @Post()
  create(@Body() createStaticItemDto: CreateStaticItemDto) {
    return this.staticItemService.create(createStaticItemDto);
  }

  @Get()
  findAll() {
    return this.staticItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticItemDto: UpdateStaticItemDto) {
    return this.staticItemService.update(+id, updateStaticItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticItemService.remove(+id);
  }
}
