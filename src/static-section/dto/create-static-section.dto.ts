import { IsString } from 'class-validator';
import { title } from 'process';
import { CreateStaticItemDto } from 'src/static-item/dto/create-static-item.dto';
import { CreateStaticSiteDto } from 'src/static-site/dto/create-static-site.dto';
export class CreateStaticSectionDto {
  @IsString()
  title;

  id;

  staticItemList: CreateStaticItemDto[];
  staticSiteList: CreateStaticSiteDto[];
}
