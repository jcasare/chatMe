import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface CommonServiceInterface {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
