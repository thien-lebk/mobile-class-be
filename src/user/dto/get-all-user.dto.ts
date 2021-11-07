import { SortValue } from '../../common/sort-value.enum';

export class GetAllUserDto {
  filter?: {
    hobbies: string[];
  };
}
