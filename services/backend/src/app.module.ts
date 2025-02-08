import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5435,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres_TR546g&!3()',
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true, // Автоматическая подгрузка сущностей
      synchronize: true, // Создаёт таблицы по моделям (❗Отключай в продакшене)
    }),
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
