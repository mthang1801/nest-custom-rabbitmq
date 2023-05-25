import { ExchangeType } from '@lukadriel/nestjs-rabbitmq-transporter/dist';
import { Module } from '@nestjs/common';
import { RabbitMQClient } from 'libs/rabbitmq';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'RABBITMQ_CLIENT',
      useFactory: () => {
        return new RabbitMQClient({
          urls: ['amqp://root:admin123@localhost:5672'],
          exchange: 'orders',
          exchangeType: ExchangeType.TOPIC,
          queue: 'server_queue_name',
          replyQueue: 'client_queue_name',
          replyQueueOptions: {
            exclusive: true,
          },
          noAck: false,
        });
      },
    },
  ],
})
export class OrdersModule {}
