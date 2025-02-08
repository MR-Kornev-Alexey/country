import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesEntity } from './entities/countries.entity';
import { SelectEntity } from './entities/select.entity';
import { AllDataResponse } from "../types/types";
export declare class CountryService {
    private countryRepository;
    private selectRepository;
    constructor(countryRepository: Repository<CountriesEntity>, selectRepository: Repository<SelectEntity>);
    getAllData(): Promise<AllDataResponse>;
    saveAll(createCountryDto: CreateCountryDto): Promise<CreateCountryDto>;
    saveSelected(selectDto: {
        data: string[];
    }): Promise<SelectEntity>;
    findSelect(): Promise<SelectEntity[]>;
}
