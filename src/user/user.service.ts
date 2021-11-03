import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEmailType } from 'src/common/enum/token-email-type.enum';
import { isNullOrUndefined } from 'src/lib/utils/util';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { ResetPasswordTokenDto } from './dto/reset-password-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as cryptojs from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { CreateTokenEmailDto } from 'src/email/dto/create-token-email.dto';
import { TokenEmailRepository } from 'src/token-email/token-email.repository';
import { EmailInfoDto } from 'src/email/dto/email-info.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { EmailService } from 'src/email/email.service';
import { v4 as uuidv4 } from 'uuid';
import e from 'express';
import { AcitveUserDto } from './dto/active-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { TokenPayload } from './dto/token-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  activeUser(
    transactionManager: EntityManager,
    acitveUserDto: AcitveUserDto,
  ): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  // if (!user) {
  //   throw new InternalServerErrorException(
  //     `Không tìm thấy người dùng với email ${email}.`,
  //   );
  // }
  // // set expired date for link
  // const expired = new Date();
  // expired.setDate(expired.getDate() + 7);
  // const resetPasswordTokenDto: ResetPasswordTokenDto = {
  //   email: email,
  //   timeStamp: expired.toString(),
  //   isActive: false,
  //   type: TokenEmailType.RESET_PASSWORD,
  // };
  // // encrypt token
  // const token = this.encryptDataToToken(resetPasswordTokenDto);
  // //create token email
  // const createTokenEmailDto: CreateTokenEmailDto = {
  //   userId: user.id,
  //   token,
  //   type: resetPasswordTokenDto.type,
  // };
  // await this.tokenEmailRepository.createTokenEmail(
  //   transactionManager,
  //   createTokenEmailDto,
  // );
  // const emailInfoDto: EmailInfoDto = {
  //   email,
  //   name: user.first_name + user.last_name,
  //   token,
  //   username: user.email,
  // };
  // user.isForgetPassword = true;
  // try {
  //   await transactionManager.save(user);
  // } catch (error) {
  //   Logger.error(error);
  // }
  // // send email
  // return this.emailService.sendResetPasswordEmail(emailInfoDto, originName);

  constructor(
    private usersRepository: UserRepository,
    private configService: ConfigService,
    private tokenEmailRepository: TokenEmailRepository,
    private emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}
  async getUserByEmail(email: string): Promise<any> {
    return await this.usersRepository.findOne({ email });
  }
  async getUserById(id: number): Promise<unknown> {
    return await this.usersRepository.findOne({ id });
  }
  async login(
    transactionManager: EntityManager,
    loginDto: LoginDto,
  ): Promise<unknown> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ email });
    if (isNullOrUndefined(user)) {
      throw new InternalServerErrorException('User is not exist');
    }
    await this.verifyPassword(password, user.password);
    const cookie = this.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    // user.password = undefined;
    return cookie;
  }
  async createUser(
    transactionEntityManager: EntityManager,

    createUserDto: CreateUserDto,
  ) {
    // checkExist email
    const { email } = createUserDto;
    const checkExist = await this.usersRepository.findOne({ email });
    if (checkExist) {
      throw new ConflictException('Email is exist.');
    }
    await this.usersRepository.createUser(
      transactionEntityManager,
      createUserDto,
    );

    // await this.emailService.sendActiveAccountEmail(
    //   emailInfoDto,
    //   'url-active-user',
    // );
    return { statusCode: 201, message: 'Register success.' };
  }

  async updateUser(
    transactionManager: EntityManager,
    updateUserDto: UpdateUserDto,
    uuid: string,
  ) {
    const {
      firstName,
      lastName,
      phoneNumber,
      dob,
      position,
      isDeleted,
      personalEmail,
      profilePhotoKey,
    } = updateUserDto;

    let user;

    if (isNullOrUndefined(user)) {
      throw new InternalServerErrorException('User is not exist.');
    }

    try {
      // await transactionManager.update(
      //   User,
      //   { id: user.id },
      //   {
      //     0firstName,
      //     last_name: lastName,
      //     phone_number: phoneNumber,
      //     dob,
      //     position,
      //     is_deleted: isDeleted,
      //     personal_email: personalEmail,
      //     profile_photo_key: profilePhotoKey,
      //   },
      // );
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error when update user.');
    }
    return { statusCode: 200, message: 'Update success.' };
  }
  async getAllUser(
    transactionManager: EntityManager,
    getAllUserDto: GetAllUserDto,
  ) {
    return this.usersRepository.getAllUser(transactionManager, getAllUserDto);
  }
  public async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Email or password wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return {
      access: token,
    };
  }
  async deleteUser(
    transactionManager: EntityManager,
    deleteUserDto: DeleteUserDto,
    uuid: string,
  ) {
    return this.usersRepository.deleteUser(
      transactionManager,
      deleteUserDto,
      uuid,
    );
  }
  async sendResetPasswordEmail(
    transactionManager: EntityManager,
    email: string,
  ) {
    // const user = await transactionManager.getRepository(User).findOne({
    //   email: email,
    //   is_deleted: false,
    // });
    // if (!user) {
    //   throw new InternalServerErrorException(
    //     `Không tìm thấy người dùng với email ${email}.`,
    //   );
    // }
    // // set expired date for link
    // const expired = new Date();
    // expired.setDate(expired.getDate() + 7);
    // const resetPasswordTokenDto: ResetPasswordTokenDto = {
    //   email: email,
    //   timeStamp: expired.toString(),
    //   isActive: false,
    //   type: TokenEmailType.RESET_PASSWORD,
    // };
    // // encrypt token
    // const token = this.encryptDataToToken(resetPasswordTokenDto);
    // //create token email
    // const createTokenEmailDto: CreateTokenEmailDto = {
    //   userId: user.id,
    //   token,
    //   type: resetPasswordTokenDto.type,
    // };
    // await this.tokenEmailRepository.createTokenEmail(
    //   transactionManager,
    //   createTokenEmailDto,
    // );
    // const emailInfoDto: EmailInfoDto = {
    //   email,
    //   name: user.first_name + user.last_name,
    //   token,
    //   username: user.email,
    // };
    // user.isForgetPassword = true;
    // try {
    //   await transactionManager.save(user);
    // } catch (error) {
    //   Logger.error(error);
    // }
    // // send email
    // return this.emailService.sendResetPasswordEmail(emailInfoDto, originName);
  }

  private encryptDataToToken(data) {
    try {
      const cipherText: string = cryptojs.AES.encrypt(
        JSON.stringify(data),
        this.configService.get<string>('EMAIL_TOKEN_KEY'),
      ).toString();
      const token: string = cipherText
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      return token;
    } catch (error) {
      console.log(error);
    }
  }
  private decryptTokenToData(token: string) {
    const cipherText: string = token.replace(/\-/g, '+').replace(/\_/g, '/');
    const data = JSON.parse(
      cryptojs.AES.decrypt(
        cipherText,
        this.configService.get<string>('EMAIL_TOKEN_KEY'),
      ).toString(cryptojs.enc.Utf8),
    );

    return data;
  }
}
