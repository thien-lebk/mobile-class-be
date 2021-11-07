import { PostModule } from './post/post.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { TokenEmailModule } from './token-email/token-email.module';
import { HobbyModule } from './hobby/hobby.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'local'}.env`,
    }),
    // ScheduleModule.forRoot(),
    // CronJobModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get<string>('TYPEORM_DATABASE_TYPE'),
          host: configService.get<string>('TYPEORM_DATABASE_HOST'),
          port: Number(configService.get<string>('TYPEORM_DATABASE_PORT')),
          username: configService.get<string>('TYPEORM_DATABASE_USERNAME'),
          password: configService.get<string>('TYPEORM_DATABASE_PASSWORD'),
          database: configService.get<string>('TYPEORM_DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: false,
          useUTC: false,
          uuidExtension: 'uuid-ossp',
          ssl: { rejectUnauthorized: false },
          namingStrategy: new SnakeNamingStrategy(),
        } as TypeOrmModuleOptions),
    }),
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
    UserModule,
    ImageModule,
    EmailModule,
    PostModule,
    TokenEmailModule,
    HobbyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
