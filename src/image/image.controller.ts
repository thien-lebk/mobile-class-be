import { UpdateImageDto } from './dto/update-image.dto';
import { ImageService } from './image.service';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateImageDto } from './dto/create-image.dto';
import { AuthUser } from 'src/user/user.decorater';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Add Success.',
  })
  @ApiOperation({ summary: 'Add image' })
  async addImage(
    @AuthUser() user: any,
    @Body() createImageDto: CreateImageDto,
  ) {
    return await this.imageService.createImage(createImageDto, user.userId);
  }

  @Put()
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: 200,
    description: 'Update Success.',
  })
  @ApiOperation({ summary: 'Update image' })
  async updateImage(
    @AuthUser() user: any,
    @Body() updateImage: UpdateImageDto,
  ) {
    return await this.imageService.updateImage(updateImage, user.userId);
  }
}
