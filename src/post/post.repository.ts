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
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { isNullOrUndefined, paramStringToJson } from '../lib/utils/util';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  constructor(private connection: Connection) {
    super();
  }

}
