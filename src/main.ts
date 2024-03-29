/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : `${AppModule.host}`;
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableShutdownHooks();

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Core')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDocument);
  });
  app.use(cookieParser());

  SwaggerModule.setup('/api/docs', app, null, {
    swaggerUrl: `http://localhost:8888/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  app.enableShutdownHooks();
  const port = 8888;
  const server = await app.listen(port);
  logger.log(`Application listening on port ${port}`);

  server.setTimeout(180000);
}
bootstrap();
