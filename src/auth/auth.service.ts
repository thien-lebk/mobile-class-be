import { UserRepository } from './../user/user.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { isNullOrUndefined } from 'src/lib/utils/util';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (isNullOrUndefined(user)) {
      throw new InternalServerErrorException('User is not exist');
    }

    await this.userService.verifyPassword(pass, user.password);
    return user;
  }
}
