import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { Env } from './config/env.schema.js';
import { setupSwagger } from './config/swagger.js';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  //ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //Swagger
  setupSwagger(app);

  //Automatically strip @Exclude() fields (e.g., password) from all response objects
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //Listen
  const PORT = app.get(ConfigService<Env, true>).get('PORT', { infer: true });
  await app.listen(PORT);
};

await bootstrap();
