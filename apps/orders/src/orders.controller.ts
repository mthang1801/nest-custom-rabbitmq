import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { RMQMessage } from 'libs/rabbitmq/interfaces/rmq-options.interface';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @MessagePattern('hello')
  handleHello(@Payload() data: any) {
    console.log('received message::', data);
    const response: RMQMessage = {
      content: data,
      options: {
        persistent: true,
      },
    };
    return response;
  }
}
