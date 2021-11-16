import { IsString } from 'class-validator';

export class CreateStaticSiteDto {
  @IsString()
  title;

  id;
}
