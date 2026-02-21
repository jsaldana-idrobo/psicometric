import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { defaultTests } from '../seed/default-tests';
import { TestDefinition, TestDocument } from './schemas/test.schema';

@Injectable()
export class TestsService implements OnModuleInit {
  constructor(
    @InjectModel(TestDefinition.name)
    private readonly testModel: Model<TestDocument>,
  ) {}

  async onModuleInit() {
    await this.deduplicateByName();

    await this.testModel.collection.createIndex({ name: 1 }, { unique: true });

    await this.testModel.bulkWrite(
      defaultTests.map((test) => ({
        updateOne: {
          filter: { name: test.name },
          update: {
            $set: {
              ...test,
              active: true,
            },
          },
          upsert: true,
        },
      })),
    );

    await this.testModel
      .updateMany(
        {
          name: {
            $nin: defaultTests.map((test) => test.name),
          },
        },
        {
          $set: {
            active: false,
          },
        },
      )
      .exec();
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

  private async deduplicateByName() {
    const duplicatedGroups = await this.testModel
      .aggregate<{
        _id: string;
        ids: Types.ObjectId[];
        count: number;
      }>([
        {
          $group: {
            _id: { $toLower: '$name' },
            ids: { $push: '$_id' },
            count: { $sum: 1 },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ])
      .exec();

    if (duplicatedGroups.length === 0) {
      return;
    }

    const idsToDelete = duplicatedGroups.flatMap((group) => group.ids.slice(1));

    if (idsToDelete.length > 0) {
      await this.testModel.deleteMany({ _id: { $in: idsToDelete } }).exec();
    }
  }
}
