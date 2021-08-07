import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';
import { Network, NetworkSchema } from './schema/network.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Network.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = NetworkSchema;
          // schema.pre('save', function () {
          //   console.log('data saved successfully');
          // });
          schema.plugin(mongoosePaginate);
          return schema;
        },
        inject: [DatabaseService],
      },
    ]),
  ],
  controllers: [NetworkController],
  providers: [NetworkService],
})
export class NetworkModule {}
