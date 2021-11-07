import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateHobbyDto } from './create-hobby.dto';

export class UpdateHobbyDto extends PartialType(CreateHobbyDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
