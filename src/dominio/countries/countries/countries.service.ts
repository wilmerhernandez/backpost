import { Injectable } from '@nestjs/common';
import { cities, countries } from '../countries.constant';
import { KeyValueDTO, ResponseModelCities } from 'src/modelos/countries.dto';

@Injectable()
export class CountriesService {

    getCountries(): KeyValueDTO[] {
        return countries
    }

    getCities(country:number): ResponseModelCities {
        let response = cities.find((element)=>element.country==country);
        return response==null?{status:100,error:"no se encontro el pais"}:{status:200,data:response.cities};
    }

}
