import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './countries.service';
import { CountriesController } from './countries.controller';
import {CountriesEntity} from "./entities/countries.entity";
import {SelectEntity} from "./entities/select.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity, SelectEntity])],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
