import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:4321';

void NestFactory.create(AppModule).then(async (app) => {
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: webOrigin.split(',').map((origin) => origin.trim()),
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
});
