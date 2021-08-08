import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { AptitudeModule } from 'src/aptitude/aptitude.module';
import { DatabaseModule } from 'src/config/database/configuration.module';
import { DatabaseService } from 'src/config/database/configuration.service';
import { NetworkModule } from 'src/network/network.module';
import { ProfileModule } from 'src/profile/profile.module';
import { TechModule } from 'src/tech/tech.module';
import { WorkModule } from 'src/work/work.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio, PortfolioSchema } from './schema/portfolio.schema';

@Module({
  imports: [
    ProfileModule,
    NetworkModule,
    WorkModule,
    AptitudeModule,
    TechModule,
    MongooseModule.forFeatureAsync([
      {
        name: Portfolio.name,
        imports: [DatabaseModule],
        useFactory: () => {
          const schema = PortfolioSchema;
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
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
