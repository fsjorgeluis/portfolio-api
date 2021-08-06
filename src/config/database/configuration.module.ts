import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DatabaseService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, DatabaseService],
  exports: [ConfigService, DatabaseService],
})
export class DatabaseModule {}
