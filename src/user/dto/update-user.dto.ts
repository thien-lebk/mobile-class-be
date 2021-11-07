import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsBoolean,
} from 'class-validator';
import { Hobby } from 'src/hobby/hobby.entity';
import { Image } from 'src/image/image.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutYou: string;

  @ApiProperty()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  hobbies: Hobby[];
  
}

