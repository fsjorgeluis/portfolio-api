import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/configuration.module';
import { DatabaseService } from './config/database/configuration.service';
import { ProfileModule } from './profile/profile.module';
import { NetworkModule } from './network/network.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (databaseSerive: DatabaseService) => ({
        uri: databaseSerive.mongo_uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
      inject: [DatabaseService],
    }),
    ProfileModule,
    NetworkModule,
    WorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
