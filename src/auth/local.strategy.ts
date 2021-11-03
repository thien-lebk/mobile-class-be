import { LoginDto } from './../user/dto/login.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private user$: UserService,
    private connection: Connection,
    private authS: AuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authS.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
