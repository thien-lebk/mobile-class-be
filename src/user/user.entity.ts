import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Hobby } from 'src/hobby/hobby.entity';
import { Image } from 'src/image/image.entity';
import { Post } from 'src/post/post.entity';

@Entity({ name: 'user', schema: 'public' })
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  aboutYou: string;

  @Column()
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  salt: string;

  @Column()
  @Exclude()
  phoneNumber: string;

  @Column()
  isDeleted: boolean;

  @Column()
  isActived: boolean;

  @Column()
  isFirstLogin: boolean;

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

  @Column()
  dob: Date;

  @ManyToMany(() => Hobby, { cascade: true })
  @JoinTable({
    name: 'user_hobbies_user',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'hobby_id', referencedColumnName: 'id' },
  })
  public hobbies: Hobby[];

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async validateEmail(email: string): Promise<boolean> {
    return email === this.email;
  }
}
