import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  images: Image[];

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;
}
