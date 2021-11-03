import { PartialType } from '@nestjs/swagger';
import { CreateHobbyDto } from './create-hobby.dto';

export class UpdateHobbyDto extends PartialType(CreateHobbyDto) {}
