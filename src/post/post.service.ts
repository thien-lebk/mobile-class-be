import { isNullOrUndefined } from 'src/lib/utils/util';
/* eslint-disable prettier/prettier */

import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { ImageRepository } from 'src/image/image.repository';

@Injectable()
export class PostService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private imageRepository: ImageRepository,
  ) {}
  async getListPostByIdUser(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      if (isNullOrUndefined(user)) {
        throw new ConflictException('User is not exist.');
      }
      const data = await this.postRepository.find({
        where: { user, isDeleted: false },
        relations: ['images'],
      });

      return { statusCode: 201, message: 'Get Success.', data };
    } catch (error) {
      console.log(error);

      throw new Error('Method not implemented.');
    }
  }
  async createPost(createPostDto: CreatePostDto, userId: any) {
    try {
      const user = await this.userRepository.getInfoUser(userId);
      const { content, title, images } = createPostDto;
      const listImage = await this.imageRepository.findImageByListId(
        images,
        userId,
      );
      const post = await this.postRepository.save({
        content,
        title,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: user,
        images: listImage,
      });

      await this.postRepository.save(post);
      return { statusCode: 201, message: 'Create Success.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error.');
    }
  }
  async deletePost(id: number, userId: any) {
    try {
   
      
      const user = await this.userRepository.getInfoUser(userId);

        
      const post = await this.postRepository.findOne({id});
      
      // console.log(user);
      // console.log(post);

      // if(post.user.id !== user.id){
      //   throw new ConflictException('Wrong user.');
      // }


      post.isDeleted = true;
   


      await this.postRepository.save(post);
      return { statusCode: 201, message: 'Delete Success.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error.');
    }
  }
  async updatePost(updatePostDto: UpdatePostDto, userId: any) {
    try {
   
      
      const user = await this.userRepository.getInfoUser(userId);
      const { content, title, images, id, isDeleted } = updatePostDto;

        
      const post = await this.postRepository.findOne({id});
      
      // console.log(user);
      // console.log(post);

      // if(post.user.id !== user.id){
      //   throw new ConflictException('Wrong user.');
      // }

      post.content = content;
      post.title = title;
      post.isDeleted = isDeleted;
      post.updatedAt = new Date();
      post.images = images;


      await this.postRepository.save(post);
      return { statusCode: 201, message: 'Update Success.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error.');
    }
  }
}
