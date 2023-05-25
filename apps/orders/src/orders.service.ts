import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQMessage } from 'libs/rabbitmq/interfaces/rmq-options.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly rabbitmqClient: ClientProxy,
  ) {}

  getHello(): string {
    const msg: RMQMessage = {
      content: 'hey there',
      options: {
        persistent: true,
      },
    };
    this.rabbitmqClient.emit('hello', msg);
    //   .subscribe((data) => console.log('receiver responsed::', data));

    //   .subscribe((data) => console.log('receiver responsed::', data));
    //   .subscribe((data) => {
    //     console.log('response::', data);
    //   });
    return 'Hello World!';
  }
}
