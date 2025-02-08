import { CountryService } from './countries.service';
import { DtoTypes } from "../types/types";
export declare class CountriesController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getAll(): Promise<import("./dto/create-country.dto").CreateCountryDto[]>;
    saveSelected(createCountryDto: DtoTypes): Promise<import("./dto/create-country.dto").CreateCountryDto>;
}
