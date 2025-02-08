import {Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import {CountryService} from './countries.service';
import {DtoTypes, SelectDto} from "../types/types";

@Controller('countries')
export class CountriesController {
    constructor(private readonly countryService: CountryService) {
    }

    @Get()
    @HttpCode(200)
    getAll() {
        return this.countryService.getAllData()
    }

    @Post("save")
    @HttpCode(200)
    saveAll(@Body() createCountryDto: DtoTypes) {
        return this.countryService.saveAll(createCountryDto)
    }
    @Post("select")
    @HttpCode(200)
    saveSelected(@Body() selectDto: SelectDto) {
        return this.countryService.saveSelected(selectDto);
    }
}
