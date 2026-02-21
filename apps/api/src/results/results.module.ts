import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from '../patients/patients.module';
import { TestDefinition, TestSchema } from '../tests/schemas/test.schema';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { TestResult, TestResultSchema } from './schemas/test-result.schema';

@Module({
  imports: [
    PatientsModule,
    MongooseModule.forFeature([
      { name: TestResult.name, schema: TestResultSchema },
      { name: TestDefinition.name, schema: TestSchema },
    ]),
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService, MongooseModule],
})
export class ResultsModule {}
