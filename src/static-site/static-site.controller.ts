import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaticSiteService } from './static-site.service';
import { CreateStaticSiteDto } from './dto/create-static-site.dto';
import { UpdateStaticSiteDto } from './dto/update-static-site.dto';

@Controller('static-site')
export class StaticSiteController {
  constructor(private readonly staticSiteService: StaticSiteService) {}

  @Post()
  create(@Body() createStaticSiteDto: CreateStaticSiteDto) {
    return this.staticSiteService.create(createStaticSiteDto);
  }

  @Get()
  findAll() {
    return this.staticSiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticSiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticSiteDto: UpdateStaticSiteDto) {
    return this.staticSiteService.update(+id, updateStaticSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticSiteService.remove(+id);
  }
}
