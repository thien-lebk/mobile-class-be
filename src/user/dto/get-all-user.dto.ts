import { ApiProperty } from '@nestjs/swagger';
import { SortValue } from '../../common/sort-value.enum';

export class GetAllUserDto {
  @ApiProperty()
  filter?: {
    hobbies: string[];
  };
}
