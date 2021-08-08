import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { Work, WorkSchema } from './schema/work.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Work.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = WorkSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
        inject: [DatabaseService],
      },
    ]),
  ],
  providers: [WorkService],
  controllers: [WorkController],
  exports: [MongooseModule],
})
export class WorkModule {}
