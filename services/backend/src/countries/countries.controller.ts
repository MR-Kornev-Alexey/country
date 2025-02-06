import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  saveSelected(@Body() createCountryDto: CreateCountryDto) {
      return this.countryService.saveSelected(createCountryDto)
  }
}
