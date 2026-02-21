import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDefinition, TestSchema } from './schemas/test.schema';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestDefinition.name, schema: TestSchema },
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService, MongooseModule],
})
export class TestsModule {}
