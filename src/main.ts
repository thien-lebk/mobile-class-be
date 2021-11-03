import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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

  SwaggerModule.setup('/api/docs', app, null, {
    swaggerUrl: `https://mobile-app-123.herokuapp.com/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT || 8888);

}
bootstrap();
