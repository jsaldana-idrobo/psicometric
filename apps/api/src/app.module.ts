import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { validateEnv } from './config/env.validation';
import { PatientsModule } from './patients/patients.module';
import { PublicSessionsModule } from './public-sessions/public-sessions.module';
import { ReportsModule } from './reports/reports.module';
import { ResultsModule } from './results/results.module';
import { TestsModule } from './tests/tests.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UsersModule,
    PatientsModule,
    TestsModule,
    ResultsModule,
    ReportsModule,
    PublicSessionsModule,
  ],
})
export class AppModule {}
