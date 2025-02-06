import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Разрешает запросы с любого домена (можно заменить на конкретный)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(process.env.PORT ?? 5000);
  console.log("port:", process.env.PORT ?? 5000 )
}
bootstrap();
