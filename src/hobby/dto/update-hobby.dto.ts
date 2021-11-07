import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateHobbyDto } from './create-hobby.dto';

export class UpdateHobbyDto extends PartialType(CreateHobbyDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  isDeleted;
}
