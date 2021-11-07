import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

@Entity({ name: 'image', schema: 'public' })
export class Image extends BaseEntity {
  constructor(partial: Partial<Image>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column()
  isDeleted: boolean;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.images)
  user: User;

  @ManyToOne(() => Post, (post) => post.images)
  post: User;
}
