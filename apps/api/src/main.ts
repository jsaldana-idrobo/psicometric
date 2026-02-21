import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:4321';

// prettier-ignore
(async () => {
  const app = await NestFactory.create(AppModule);

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
})().catch((error: unknown) => { // NOSONAR - Top-level await is not available in this CJS entrypoint.
  console.error('Error starting API application', error);
  process.exitCode = 1;
});
