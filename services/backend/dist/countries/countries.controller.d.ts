import { CountryService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
export declare class CountriesController {
    private readonly countryService;
    constructor(countryService: CountryService);
    saveSelected(createCountryDto: CreateCountryDto): Promise<import("./entities/country.entity").CountryEntity>;
}
