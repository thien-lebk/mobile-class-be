import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { AuthUser } from 'src/user/user.decorater';
import { GetAllHobbyDto } from './dto/get-all-hobby.dto';

@ApiTags('Hobby')
@Controller('hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}
  @Get()
  @ApiResponse({
    status: 500,
    description: 'Error',
  })
  @ApiResponse({
    status: 404,
    description: 'Cant find information.',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Xem danh sách sở thích.' })
  async getList(@Body() getAllHobbyDto: GetAllHobbyDto) {
    return await this.hobbyService.getList();
  }

  @Post()
  @ApiResponse({
    status: 500,
    description: 'Error',
  })
  @ApiResponse({
    status: 404,
    description: 'Cant find information.',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Tạo sở thích.' })
  async create(@Body() createHobbyDto: CreateHobbyDto) {
    return await this.hobbyService.create(createHobbyDto);
  }

  @Put()
  @ApiResponse({
    status: 500,
    description: 'Error',
  })
  @ApiResponse({
    status: 404,
    description: 'Cant find information.',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Cập nhật sở thích.' })
  async update(@Body() updateHobbyDto: UpdateHobbyDto) {
    return await this.hobbyService.update(updateHobbyDto);
  }
}
