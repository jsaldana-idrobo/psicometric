import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultTests } from '../seed/default-tests';
import { TestDefinition, TestDocument } from './schemas/test.schema';

@Injectable()
export class TestsService implements OnModuleInit {
  constructor(
    @InjectModel(TestDefinition.name)
    private readonly testModel: Model<TestDocument>,
  ) {}

  async onModuleInit() {
    const existingCount = await this.testModel.countDocuments().exec();
    if (existingCount === 0) {
      await this.testModel.insertMany(
        defaultTests.map((test) => ({
          ...test,
          active: true,
        })),
      );
    }
  }

  async findAll() {
    return this.testModel
      .find({ active: true })
      .sort({ name: 1 })
      .lean()
      .exec();
  }

  async findOne(id: string) {
    const test = await this.testModel
      .findOne({ _id: id, active: true })
      .lean()
      .exec();

    if (!test) {
      throw new NotFoundException('Prueba no encontrada');
    }

    return test;
  }
}
