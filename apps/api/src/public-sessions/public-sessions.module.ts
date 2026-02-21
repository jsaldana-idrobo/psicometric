import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from '../patients/patients.module';
import { ResultsModule } from '../results/results.module';
import { TestDefinition, TestSchema } from '../tests/schemas/test.schema';
import { PublicSessionsController } from './public-sessions.controller';
import { PublicSessionsService } from './public-sessions.service';
import {
  PublicSession,
  PublicSessionSchema,
} from './schemas/public-session.schema';

@Module({
  imports: [
    PatientsModule,
    ResultsModule,
    MongooseModule.forFeature([
      { name: PublicSession.name, schema: PublicSessionSchema },
      { name: TestDefinition.name, schema: TestSchema },
    ]),
  ],
  controllers: [PublicSessionsController],
  providers: [PublicSessionsService],
  exports: [PublicSessionsService, MongooseModule],
})
export class PublicSessionsModule {}
