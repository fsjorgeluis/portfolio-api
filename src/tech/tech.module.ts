import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { Tech, TechSchema } from './schema/tech.schema';
import { TechController } from './tech.controller';
import { TechService } from './tech.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tech.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = TechSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
        inject: [DatabaseService],
      },
    ]),
  ],
  controllers: [TechController],
  providers: [TechService],
  exports: [MongooseModule],
})
export class TechModule {}
