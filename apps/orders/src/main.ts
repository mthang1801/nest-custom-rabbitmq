import { NestFactory } from '@nestjs/core';
import { CustomStrategy } from '@nestjs/microservices';
import { ExchangeType, RabbitMQServer } from 'libs/rabbitmq';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.connectMicroservice<CustomStrategy>({
    strategy: new RabbitMQServer({
      queue: 'queue_name',
      exchange: 'orders',
      exchangeType: ExchangeType.TOPIC,
      urls: ['amqp://root:admin123@localhost:5672'],
      noAck: false,
    }),
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
