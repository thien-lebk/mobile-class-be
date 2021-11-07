import { Module } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { HobbyController } from './hobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbyRepository } from './hobby.repository';
import { Hobby } from './hobby.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HobbyRepository])],
  controllers: [HobbyController],
  providers: [HobbyService],
  exports: [HobbyService],
})
export class HobbyModule {}
