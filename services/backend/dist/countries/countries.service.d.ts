import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
export declare class CountryService {
    private countryRepository;
    constructor(countryRepository: Repository<CountryEntity>);
    saveSelected(createCountryDto: CreateCountryDto): Promise<CountryEntity>;
    findAll(): Promise<CountryEntity[]>;
}
