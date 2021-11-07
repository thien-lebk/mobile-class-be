import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateImageDto {
  @ApiProperty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  isDeleted: boolean;
}
