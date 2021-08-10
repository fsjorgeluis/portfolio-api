import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './schema/account.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Account.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = AccountSchema;
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
  controllers: [AccountController],
  providers: [AccountService],
  exports: [MongooseModule, AccountService],
})
export class AccountModule {}
