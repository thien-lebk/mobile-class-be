import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaticSectionService } from './static-section.service';
import { CreateStaticSectionDto } from './dto/create-static-section.dto';
import { UpdateStaticSectionDto } from './dto/update-static-section.dto';

@Controller('static-section')
export class StaticSectionController {
  constructor(private readonly staticSectionService: StaticSectionService) {}

  @Post()
  create(@Body() createStaticSectionDto: CreateStaticSectionDto) {
    return this.staticSectionService.create(createStaticSectionDto);
  }

  @Get()
  findAll() {
    return this.staticSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticSectionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaticSectionDto: UpdateStaticSectionDto,
  ) {
    return this.staticSectionService.update(+id, updateStaticSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticSectionService.remove(+id);
  }
}
