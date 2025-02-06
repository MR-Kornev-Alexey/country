import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './countries.service';
import { CountriesController } from './countries.controller';
import {CountryEntity} from "./entities/country.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
