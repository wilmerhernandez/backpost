import { Injectable } from '@nestjs/common';
import { cities, countries } from '../countries.constant';

@Injectable()
export class CountriesService {

    getCountries(): Array<{key:number,value:string}> {
        return countries
    }

    getCities(country:number): {status:number,error?:string,data?:Array<{key:number,value:string}>} {
        let response = cities.find((element)=>element.country==country);
        return response==null?{status:100,error:"no se encontro el pais"}:{status:200,data:response.cities};
    }

}
