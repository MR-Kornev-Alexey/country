import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesEntity } from "./entities/countries.entity";
export declare class CountryService {
    private countryRepository;
    constructor(countryRepository: Repository<CountriesEntity>);
    getAllData(): Promise<CreateCountryDto[]>;
    saveSelected(createCountryDto: CreateCountryDto): Promise<CreateCountryDto>;
    findAll(): Promise<CountryEntity[]>;
}
