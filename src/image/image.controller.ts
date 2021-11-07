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
  @ApiOperation({ summary: 'Thêm hình' })
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
  @ApiOperation({ summary: 'Cập nhật hình' })
  async updateImage(
    @AuthUser() user: any,
    @Body() updateImage: UpdateImageDto,
  ) {
    return await this.imageService.updateImage(updateImage, user.userId);
  }

  // xoá hình
  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: 200,
    description: 'Delete Success.',
  })
  @ApiOperation({ summary: 'Xoá hình' })
  async deleteImage(@AuthUser() user: any, @Param('id') id: number) {
    return await this.imageService.deleteImage(id, user.userId);
  }
}
