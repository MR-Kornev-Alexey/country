import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(process.env.HOST_PORT || 5000);
  console.log('Application is running on port:', process.env.HOST_PORT || 5000);
  console.log('Database Host:', process.env.DB_HOST);
  console.log('Database Port:', process.env.DB_PORT);
  console.log('Database User:', process.env.POSTGRES_USER);
  console.log('Database Name:', process.env.POSTGRES_DB);
}
bootstrap();
