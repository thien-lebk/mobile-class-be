import { GetAllUserPageDto } from './dto/get-all-user-page.dto';
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
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { isNullOrUndefined, paramStringToJson } from '../lib/utils/util';
import { GetAllUserDto } from './dto/get-all-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private connection: Connection) {
    super();
  }

  async getInfoUser(id: number): Promise<any> {
    const query = this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id=:id and user.isDeleted = false', { id })
      .select([
        'user.id',
        'user.fullName',
        'user.dob',
        'hobby.name',
        'user.aboutYou',
        'user.dob',
        'user.phoneNumber',
        'user.isFirstLogin',
      ])
      .leftJoinAndSelect('user.hobbies', 'hobby', 'hobby.isDeleted = false')
      .leftJoinAndSelect('user.images', 'image', 'image.isDeleted = false');

    try {
      const data = await query.getOne();

      return data;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error');
    }
  }
  async createUser(
    transactionEntityManager: EntityManager,
    createUserDto: CreateUserDto,
  ) {
    const { email, password, fullName, aboutYou, phoneNumber, dob } =
      createUserDto;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = transactionEntityManager.create(User, {
      phoneNumber,
      fullName,
      email,
      password: hashedPassword,
      salt: salt,
      isFirstLogin: true,
      aboutYou,
      createdAt: new Date(),
      updatedAt: new Date(),
      dob: dob,
    });

    // save user
    try {
      await transactionEntityManager.save(user);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error.');
    }

    return user;
  }

  async getAllUser(
    transactionManager: EntityManager,
    getAllUserPageDto: GetAllUserPageDto,
    getAllUserDto: GetAllUserDto,
    id:number,
  ) {
    const { page } = getAllUserPageDto;
    const { filter } = getAllUserDto;
    let { perPage } = getAllUserPageDto;
    if (isNullOrUndefined(perPage)) {
      perPage = 25;
    }

    const query = transactionManager
      .getRepository(User)
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.fullName',
        'user.dob',
        'hobby.name',
        'user.aboutYou',
        'user.dob',
      ])
      .leftJoin('user.hobbies', 'hobby', 'hobby.isDeleted = false')
      .leftJoin('user.images', 'image', 'image.isDeleted = false and image.type = :type',{type:'cover'})
      .where('user.isDeleted = false')
      .andWhere('user.id != :id',{id:id})
      // .andWhere('image.type = :type',{type:'cover'})
      .take(perPage)
      .skip((page - 1) * perPage)
      .orderBy('user.fullName', 'ASC');

    // Filter list
    if (!isNullOrUndefined(filter)) {
      filter.hobbies.forEach((ele) => {
        if (!isNullOrUndefined(ele)) {
          query.andWhere('LOWER(hobby.name) LIKE LOWER(:name)', {
            name: `%${ele}%`,
          });
        }
      });
    }

    try {
      const data = await query.getMany();
      const query2 = transactionManager
        .getRepository(User)
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.fullName',
          'user.dob',
          'hobby.name',
          'user.aboutYou',
          'user.dob',
        ])
        .leftJoinAndSelect('user.hobbies', 'hobby', 'hobby.isDeleted = FALSE')
        .leftJoinAndSelect(
          'user.images',
          'image',
          "image.isDeleted = false and image.type != ''",
        )
        .orderBy('user.fullName', 'ASC');
      // data.forEach(ele=>{
      //   query2.orWhere('user.id  = :id ',{id:ele.id})
      // })
      query2.andWhere(
        new Brackets((qb) => {
          data.forEach((ele) => {
            qb.orWhere(`user.id  = ${ele.id}`);
          });
        }),
      );
      const total = await query.getCount();
      const data2 = await query2.getMany();
      return { statusCode: 200, data: { data: data2, total: total } };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error.');
    }
  }
}
