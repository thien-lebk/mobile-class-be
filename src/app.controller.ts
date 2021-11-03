import { UserService } from './user/user.service';
import { Request, response } from 'express';
import {
  Get,
  Controller,
  Res,
  Render,
  Req,
  Query,
  Param,
  Post,
  Logger,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { LoginDto } from './user/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private connection: Connection, private user$: UserService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/dang-nhap-tai-khoan')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);

    return await this.connection.transaction((transactionManager) => {
      return this.user$.login(transactionManager, loginDto);
    });
  }
}
