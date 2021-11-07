import { HobbyModule } from './../hobby/hobby.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenEmailRepository } from 'src/token-email/token-email.repository';
import { EmailModule } from 'src/email/email.module';
import { ImageRepository } from 'src/image/image.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      TokenEmailRepository,
      ImageRepository,
    ]),
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'local'}.env`,
    }),
    EmailModule,
    HobbyModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
