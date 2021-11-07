import { UserRepository } from './../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './image.repository';
import { Image } from './image.entity';
import { Connection } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    private imageRepo: ImageRepository,
    private userRepository: UserRepository,
  ) {}
  async deleteImage(id: number, userId: any) {
    try {
      const user = await this.userRepository.getInfoUser(userId);
      const img = await this.imageRepo.findOne({ id });
      // if(post.user.id !== user.id){
      //   throw new ConflictException('Wrong user.');
      // }
      img.isDeleted = true;
      await this.imageRepo.save(img);
      return { statusCode: 201, message: 'Delete Success.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error.');
    }
  }
  async updateImage(updateImage: UpdateImageDto, userId: any) {
    try {
      const image = await this.imageRepo.findOne({
        where: { id: updateImage.id },
        relations: ['user'],
      });

      const user = await this.userRepository.findOne({ id: userId });
      if (image.user.id !== user.id) {
        throw new ConflictException('This image not belong to user.');
      }

      image.updatedAt = new Date();
      image.isDeleted = updateImage.isDeleted;
      image.content = updateImage.content;
      await this.imageRepo.save(image);
      return { statusCode: 201, message: 'Update Success.' };
    } catch (error) {
      console.log(error);
      throw new Error('Error.');
    }
  }
  async createImage(createImageDto: CreateImageDto, id: number) {
    try {
      const user = await this.userRepository.getInfoUser(id);
      const { content, type } = createImageDto;

      const image = await this.imageRepo.save({
        content,
        type,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: user,
      });

      // user.images.push(image);
      // await this.userRepository.save(user);
      return { statusCode: 201, message: 'Create Success.', data: image };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error.');
    }
  }
}
