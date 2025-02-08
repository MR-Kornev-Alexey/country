import {Controller, Get, Post, Body} from '@nestjs/common';
import {CountryService} from './countries.service';
import {DtoTypes} from "../types/types";

@Controller('countries')
export class CountriesController {
    constructor(private readonly countryService: CountryService) {
    }

    @Get()
    getAll() {
        return this.countryService.getAllData()
    }

    @Post()
    saveSelected(@Body() createCountryDto: DtoTypes) {
        return this.countryService.saveSelected(createCountryDto)
    }
}
