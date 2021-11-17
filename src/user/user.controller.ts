import { GetAllUserPageDto } from './dto/get-all-user-page.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection } from 'typeorm';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { AcitveUserDto } from './dto/active-user.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from './user.decorater';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private connection: Connection,
  ) {}

  @Get('/list')
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách người dùng thành công.',
  })
  @ApiOperation({ summary: 'Danh sách người dùng' })
  async getAllUser(
    @Query() getAllUserPageDto: GetAllUserPageDto,
    @Body() getAllUserDto: GetAllUserDto,
  ) {
    return await this.connection.transaction((transactionManager) => {
      return this.userService.getAllUser(
        transactionManager,
        getAllUserPageDto,
        getAllUserDto,
      );
    });
  }

  @Post()
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tạo người dùng.',
  })
  @ApiResponse({
    status: 409,
    description: 'Người dùng đã tồn tại trong hệ thống.',
  })
  @ApiOperation({ summary: 'Đăng kí tài khoản' })
  @ApiResponse({ status: 201, description: 'Tạo người dùng thành công' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.connection.transaction((transactionManager) => {
      return this.userService.createUser(transactionManager, createUserDto);
    });
  }

  @Put()
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình chỉnh sửa thông tin người dùng.',
  })
  @ApiResponse({
    status: 200,
    description: 'Chỉnh sửa thông tin người dùng thành công',
  })
  @ApiOperation({ summary: 'Chỉnh sửa người dùng.' })
  @UseGuards(JwtAuthenticationGuard)
  async update(@Body() updateUserDto: UpdateUserDto, @AuthUser() user: any) {
    return await this.connection.transaction((transactionManager) => {
      return this.userService.updateUser(
        transactionManager,
        updateUserDto,
        user,
      );
    });
  }

  @Post('send-email-reset-password/:email')
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình gửi email, hoặc email không đúng.',
  })
  @ApiResponse({ status: 201, description: 'Gửi mail thành công' })
  @ApiOperation({ summary: 'Gửi email quên mật khẩu.' })
  async sendResetPasswordEmail(@Body('email') email: string) {
    return await this.connection.transaction((transactionManager) => {
      return this.userService.sendResetPasswordEmail(transactionManager, email);
    });
  }

  @Get()
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình lấy thông tin người dùng.',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy dữ liệu người dùng thành công',
  })
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Xem chi tiết người dùng.' })
  async getDetailUser(@AuthUser() user: any) {
    return await this.connection.transaction(async (transactionManager) => {
      return await this.userService.getUserById(user.userId);
    });
  }
}
