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
import { AuthUser } from 'src/user/user.decorater';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Add Success.',
  })
  @ApiOperation({ summary: 'Thêm Post' })
  async addPost(@AuthUser() user: any, @Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto, user.userId);
  }

  @Put()
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: 200,
    description: 'Update Success.',
  })
  @ApiOperation({ summary: 'Cập nhật Post' })
  async updatePost(
    @AuthUser() user: any,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.updatePost(updatePostDto, user.userId);
  }

  @Get('/:id')
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: 200,
    description: 'Get Success.',
  })
  @ApiOperation({ summary: 'Lấy danh sách Post từ id người dùng' })
  async getListPostByIdUser(@AuthUser() user: any, @Param('id') id: number) {
    return await this.postService.getListPostByIdUser(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: 200,
    description: 'Delete Success.',
  })
  @ApiOperation({ summary: 'Xoá Post từ id post' })
  async deletePost(@AuthUser() user: any, @Param('id') id: number) {
    return await this.postService.deletePost(id, user.userId);
  }
}
