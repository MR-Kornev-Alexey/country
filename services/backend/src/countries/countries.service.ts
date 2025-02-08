import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import {CountriesEntity} from "./entities/countries.entity";

@Injectable()
export class CountryService {
  constructor(
      @InjectRepository(CountriesEntity)
      private countryRepository: Repository<CountriesEntity>,
  ) {}

  async getAllData(): Promise<CreateCountryDto[]> {
    return await this.countryRepository.find();
  }

  async saveSelected(createCountryDto: CreateCountryDto): Promise<CreateCountryDto> {
    await this.countryRepository.clear();
    const country = this.countryRepository.create(createCountryDto);
    console.log(country);
    // Сохраняем новый объект в базу данных
    return await this.countryRepository.save(country);
  }

  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }
}
