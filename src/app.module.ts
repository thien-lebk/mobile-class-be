import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ScheduleModule } from '@nestjs/schedule';
// import { CronJobModule } from 'src/lib/cron-job/cron-job.module';
import { HealthController } from 'src/lib/health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { AwsModule } from 'src/lib/aws/aws.module';
// import { AppGateway } from './app.gateway';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { TokenEmailModule } from './token-email/token-email.module';
import { AppController } from './app.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TopicModule } from './topic/topic.module';
import { HobbyModule } from './hobby/hobby.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    PrometheusModule.register(),
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
    TerminusModule,
    AwsModule,
    CustomerModule,
    UserModule,
    EmailModule,
    TokenEmailModule,
    PostModule,
    CategoryModule,
    TopicModule,
    HobbyModule,
    AuthModule,
  ],
  controllers: [HealthController, AppController],
  providers: [],
  // AppGateway
})
export class AppModule {}
