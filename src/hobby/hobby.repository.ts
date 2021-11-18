/* eslint-disable prettier/prettier */
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
import { Hobby } from './hobby.entity';
import { ListHobby } from 'src/user/dto/update-user.dto';

@EntityRepository(Hobby)
export class HobbyRepository extends Repository<Hobby> {
  
  constructor(private connection: Connection) {
    super();
  }
  async getListHobbies(hobbies:Hobby[]) {
    const query = this.connection
      .getRepository(Hobby)
      .createQueryBuilder('hobby');
    hobbies.forEach((element) => {
      query.andWhere('hobby.id = :id', { id: element.id });
    });
    try {
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Method not implemented.');
    }
  }
  async getListForUpdateUser(hobbies: ListHobby[]) {
    const query = this.connection
      .getRepository(Hobby)
      .createQueryBuilder('hobby')
      .where('hobby.isDeleted = false');      
    // hobbies.forEach((element) => {
    //   query.orWhere('hobby.id = :id', { id: element.id });
    // });


    query.andWhere(
      new Brackets((qb) => {
        hobbies.forEach((element) => {
          qb.orWhere('hobby.id = :id', { id: element.id });
        });
      }),
    );
    try {      
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Method not implemented.');
    }
  }
  async getListHobbiesByListId(hobbies:string[]) {
    const query = this.connection
      .getRepository(Hobby)
      .createQueryBuilder('hobby');
    hobbies.forEach((element) => {
      query.andWhere('hobby.id = :id', { id: element });
    });
    try {
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Method not implemented.');
    }
  }
}
