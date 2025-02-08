import { IsArray, IsString } from 'class-validator';
import {CreateCountryDto} from "../countries/dto/create-country.dto";
import {SelectEntity} from "../countries/entities/select.entity";

export interface DtoTypes {
    id: number;
    currency: string;
    alphabeticCode: string;
    numericCode: string;
    entity: string;
}

export class SelectDto {
    @IsArray()
    @IsString({ each: true }) // Проверяет, что каждый элемент массива является строкой
    data: string[];
}

export type AllDataResponse = [CreateCountryDto[], SelectEntity | null];