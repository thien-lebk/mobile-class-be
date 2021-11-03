import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { Connection, EntityManager } from 'typeorm';
import { LoginDto } from './user/dto/login.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private connection: Connection,
    private user$: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/dang-nhap-tai-khoan')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    console.log(123);

    return await this.connection.transaction((transactionManager) => {
      return this.user$.login(transactionManager, loginDto);
    });
  }
}
