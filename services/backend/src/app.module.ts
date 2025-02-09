import {Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает модуль доступным во всем приложении
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true, // Автоматическая подгрузка сущностей
      synchronize: true, // Создаёт таблицы по моделям (❗Отключай в продакшене)
    }),
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('Значения переменных окружения:');
    this.logger.log(`DB_HOST: ${process.env.DB_HOST}`);
    this.logger.log(`DB_PORT: ${process.env.DB_PORT}`);
    this.logger.log(`POSTGRES_USER: ${process.env.POSTGRES_USER}`);
    this.logger.log(`POSTGRES_PASSWORD: ${process.env.POSTGRES_PASSWORD}`);
    this.logger.log(`POSTGRES_DB: ${process.env.POSTGRES_DB}`);
  }
}
