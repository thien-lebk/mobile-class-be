import { Module } from '@nestjs/common';
import { StaticSiteService } from './static-site.service';
import { StaticSiteController } from './static-site.controller';

@Module({
  controllers: [StaticSiteController],
  providers: [StaticSiteService]
})
export class StaticSiteModule {}
