import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user', schema: 'public' })
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column()
  aboutYou: string;

  @ApiProperty()
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

  @ApiProperty()
  @Column()
  isDeleted: boolean;

  @ApiProperty()
  @Column()
  isActived: boolean;

  @ApiProperty()
  @Column()
  isFirst_login: boolean;

  @ApiProperty()
  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty()
  @Column()
  dob: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async validateEmail(email: string): Promise<boolean> {
    return email === this.email;
  }
}
