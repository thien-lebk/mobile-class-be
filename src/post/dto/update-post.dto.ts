import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Image } from 'src/image/image.entity';

export class UpdatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  images: Image[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  isDeleted: boolean;
}
