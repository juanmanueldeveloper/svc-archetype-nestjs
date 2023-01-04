import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  root(): string {
    // return this.config.get('APP_URL');
    return 'localhost';
  }
}
