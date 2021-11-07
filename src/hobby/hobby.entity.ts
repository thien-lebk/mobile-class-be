import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { isNotEmpty } from 'class-validator';

@Entity({ name: 'hobby', schema: 'public' })
export class Hobby extends BaseEntity {
  constructor(partial: Partial<Hobby>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isDeleted: boolean;

  @ManyToMany(() => Hobby)
  @JoinTable({
    name: 'user_hobbies_user',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'hobby_id', referencedColumnName: 'id' },
  })
  public hobbies: Hobby[];
}
