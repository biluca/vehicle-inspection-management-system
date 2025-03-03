import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async hello() {
    return '<h1>Hello, This is the Inspections API</h1>';
  }
}
