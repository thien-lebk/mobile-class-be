/* eslint-disable prettier/prettier */

import { CreateImageDto } from './dto/create-image.dto';
import {
  Logger,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  Repository,
  EntityRepository,
  getRepository,
  EntityManager,
  getConnection,
  Connection,
  Brackets,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { isNullOrUndefined, paramStringToJson } from '../lib/utils/util';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  constructor(private connection: Connection) {
    super();
  }

  async findImageByListId(listId: number[], idUser: number) {
    const query = this.createQueryBuilder('image').where(
      'image.isDeleted = false and user_id = :idUser',
      { idUser: idUser },
    );

    query.andWhere(
      new Brackets((qb) => {
        listId.forEach((ele) => {
          qb.orWhere(`image.id = ${ele}`);
        });
      }),
    );

    try {
      const data = await query.getMany();
      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error');
    }
  }
  async createImage(createImageDto: CreateImageDto) {
    const { content, type } = createImageDto;

    return await this.connection.getRepository(Image).create({
      content,
      type,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
