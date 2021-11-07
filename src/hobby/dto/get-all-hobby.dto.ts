import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllHobbyDto {
  @ApiProperty()
  @IsNotEmpty()
  nameList: string[];
}
