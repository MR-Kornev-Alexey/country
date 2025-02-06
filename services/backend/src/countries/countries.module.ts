import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './countries.service';
import { CountriesController } from './countries.controller';
import {CountryEntity} from "./entities/country.entity";
import {CountriesEntity} from "./entities/countries.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, CountriesEntity ])],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
