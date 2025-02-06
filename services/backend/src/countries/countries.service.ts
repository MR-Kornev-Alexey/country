import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
      @InjectRepository(CountryEntity)
      private countryRepository: Repository<CountryEntity>,
  ) {}

  async saveSelected(createCountryDto: CreateCountryDto): Promise<CountryEntity> {
    // Удаляем все записи в таблице
    await this.countryRepository.clear();

    // Создаём новый объект страны на основе DTO
    const country = this.countryRepository.create(createCountryDto);

    // Сохраняем новый объект в базу данных
    return await this.countryRepository.save(country);
  }

  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }
}
