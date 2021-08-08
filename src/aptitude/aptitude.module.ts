import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { AptitudeController } from './aptitude.controller';
import { AptitudeService } from './aptitude.service';
import { Aptitude, AptitudeSchema } from './schema/aptitude.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Aptitude.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = AptitudeSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
        inject: [DatabaseService],
      },
    ]),
  ],
  controllers: [AptitudeController],
  providers: [AptitudeService],
  exports: [MongooseModule],
})
export class AptitudeModule {}
