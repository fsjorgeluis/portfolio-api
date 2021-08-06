import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/configuration.module';
import { DatabaseService } from './config/database/configuration.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot() || // delete for production build
      MongooseModule.forRootAsync({
        imports: [DatabaseModule],
        useFactory: (databaseSerive: DatabaseService) => ({
          uri: databaseSerive.mongo_uri,
        }),
        inject: [DatabaseService],
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
