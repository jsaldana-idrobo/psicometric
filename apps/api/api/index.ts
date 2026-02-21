import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from '../src/app.module';

const server = express();
let appPromise: Promise<void> | null = null;

async function bootstrap() {
  if (!appPromise) {
    appPromise = (async () => {
      const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

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

      const webOrigin = process.env.WEB_ORIGIN ?? 'https://psicometric.vercel.app';

      app.enableCors({
        origin: webOrigin.split(',').map((origin) => origin.trim()),
        credentials: true,
      });

      await app.init();
    })();
  }

  return appPromise;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await bootstrap();
  return server(req, res);
}
