import { GetAllHobbyDto } from './dto/get-all-hobby.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { HobbyRepository } from './hobby.repository';
import { Hobby } from './hobby.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HobbyService {
  constructor(private hobbyRepo: HobbyRepository) {}
  async create(createHobbyDto: CreateHobbyDto) {
    const hobby = await this.hobbyRepo.findOne({
      name: createHobbyDto.name,
      isDeleted: false,
    });
    if (hobby) {
      throw new ConflictException('Hobby is exist.');
    }
    try {
      await this.hobbyRepo.save(createHobbyDto);
      return { statusCode: 201, message: 'Create success.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error When Create');
    }
  }

  async getListForUpdateUser(hobbies: Hobby[]) {
    return await this.hobbyRepo.getListForUpdateUser(hobbies);
  }
  async getList() {
    try {
      console.log(123);
      const data = await this.hobbyRepo.find({ isDeleted: false });

      return { statusCode: 201, message: 'Get success.', data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error When Get List');
    }
  }
  async update(updateHobbyDto: UpdateHobbyDto) {
    const hobby = await this.hobbyRepo.findOne({ id: updateHobbyDto.id });
    if (!hobby) {
      throw new ConflictException('Hobby is not exist.');
    }
    if (hobby.name !== updateHobbyDto.name) {
      const checkName = await this.hobbyRepo.findOne({
        name: updateHobbyDto.name,
        isDeleted: false,
      });
      if (checkName) {
        throw new ConflictException('Hobby is exist.');
      }
    }

    //Case phuc hoi 1 hobby, check ten hien tai co bi trung
    if (
      hobby.name == updateHobbyDto.name &&
      hobby.isDeleted != updateHobbyDto.isDeleted &&
      hobby.isDeleted == true
    ) {
      const checkName = await this.hobbyRepo.findOne({
        name: updateHobbyDto.name,
        isDeleted: false,
      });
      if (checkName) {
        throw new ConflictException(
          'Hobby is exist, Please change it to another name.',
        );
      }
    }
    try {
      await this.hobbyRepo.save(updateHobbyDto);
      return { statusCode: 201, message: 'Update success.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error When Update');
    }
  }
}
