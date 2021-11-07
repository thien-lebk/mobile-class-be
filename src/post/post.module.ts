import { PostController } from './post.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { ImageRepository } from 'src/image/image.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, UserRepository, ImageRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
