import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageRepository, UserRepository])],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [],
})
export class ImageModule {}
