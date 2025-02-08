import { CountryService } from './countries.service';
import { DtoTypes, SelectDto } from "../types/types";
export declare class CountriesController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getAll(): Promise<import("../types/types").AllDataResponse>;
    saveAll(createCountryDto: DtoTypes): Promise<import("./dto/create-country.dto").CreateCountryDto>;
    saveSelected(selectDto: SelectDto): Promise<import("./entities/select.entity").SelectEntity>;
}
