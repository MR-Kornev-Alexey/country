import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesEntity } from './entities/countries.entity';
import { SelectEntity } from './entities/select.entity';
import {AllDataResponse} from "../types/types";

// Определяем тип, который будет использоваться для возвращаемого значения




@Injectable()
export class CountryService {
  constructor(
      @InjectRepository(CountriesEntity)
      private countryRepository: Repository<CountriesEntity>, // Репозиторий для стран
      @InjectRepository(SelectEntity)
      private selectRepository: Repository<SelectEntity>, // Репозиторий для выбранных стран
  ) {}

  async getAllData(): Promise<AllDataResponse> {
    const countries = await this.countryRepository.find();
    const selected = await this.selectRepository.findOne({ where: { id: 1 } });
    return [countries, selected]; // Возвращаем массив с двумя элементами
  }

  async saveAll(createCountryDto: CreateCountryDto): Promise<CreateCountryDto> {
    await this.countryRepository.clear(); // Очищаем старые данные
    const country = this.countryRepository.create(createCountryDto); // Создаем новую запись
    return await this.countryRepository.save(country); // Сохраняем в БД
  }

  async saveSelected(selectDto: { data: string[] }): Promise<SelectEntity> {
    const existingData = await this.selectRepository.findOne({ where: { id: In([1, 2]) } });

    if (existingData) {
      // Если такая запись существует, обновляем её данные
      existingData.data = selectDto.data;
      return await this.selectRepository.save(existingData);
    } else {
      // Если записи нет, создаём новую
      const newSelect = this.selectRepository.create(selectDto);
      return await this.selectRepository.save(newSelect);
    }
  }

  async findSelect(): Promise<SelectEntity[]> {
    return await this.selectRepository.find(); // Возвращаем все выбранные страны
  }
}
