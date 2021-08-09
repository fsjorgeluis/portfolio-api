import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './schema/profile.schema';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Profile.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = ProfileSchema;
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
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [MongooseModule],
})
export class ProfileModule {}
