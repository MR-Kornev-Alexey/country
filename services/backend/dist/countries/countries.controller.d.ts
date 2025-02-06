import { CountryService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
export declare class CountriesController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getAll(createCountryDto: CreateCountryDto): Promise<CreateCountryDto[]>;
    saveSelected(createCountryDto: CreateCountryDto): Promise<CreateCountryDto>;
}
