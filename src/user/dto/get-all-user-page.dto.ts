import { ApiProperty } from '@nestjs/swagger';
import { SortValue } from '../../common/sort-value.enum';

export class GetAllUserPageDto {
  @ApiProperty()
  perPage?: number;
  
  @ApiProperty()
  page: number;
}
