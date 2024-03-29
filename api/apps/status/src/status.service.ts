import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getHello(): string {
    return 'Hello World!';
  }

  async getStatus() {
    return { user: 'online' };
  }

  async createStatus() {}
}
