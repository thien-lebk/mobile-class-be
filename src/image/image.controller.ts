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
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateImageDto } from './dto/create-image.dto';
import { AuthUser } from 'src/user/user.decorater';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './file-upload.utils';
import { diskStorage } from 'multer';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  // @UseGuards(JwtAuthenticationGuard)
  // @Post()
  // @ApiResponse({
  //   status: 200,
  //   description: 'Add Success.',
  // })
  // @ApiOperation({ summary: 'Thêm hình' })
  // async addImage(
  //   @AuthUser() user: any,
  //   @Body() createImageDto: CreateImageDto,
  // ) {
  //   return await this.imageService.createImage(createImageDto, user.userId);
  // }

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

  //ver 2
  //Download img
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Download hình' })
  @Get('download/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }


  //Upload Img
  @ApiOperation({ summary: 'Upload hình' })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file,
    @AuthUser() user: any,
    @Body() type: string,
  ) {
    console.log(user);
    return await this.imageService.createImageV2(
      file.filename,
      user.userId,
      type,
    );
  }
}
