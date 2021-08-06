import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  get mongo_uri(): string {
    return this.configService.get<string>('db.uri');
  }
}
