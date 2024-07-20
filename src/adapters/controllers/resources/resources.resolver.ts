import { Args, Query, Resolver } from '@nestjs/graphql';
import { CountriesService } from 'src/dominio/countries/countries/countries.service';
import { ResourcesService } from 'src/dominio/resources/resources.service';
import { KeyValueDTO, ResponseModelCities } from 'src/modelos/countries.dto';
import { DataDto } from 'src/modelos/resources.model';

@Resolver()
export class ResourcesResolver {

    constructor(private resources:ResourcesService,private readonly countrieService:CountriesService){
        
    }

    @Query(() => [KeyValueDTO], { description: 'This method returns a list of countries', name: 'countries' })
    countries(): KeyValueDTO[] {
      return this.countrieService.getCountries();
    }
  
    @Query(() => ResponseModelCities, { description: 'it method is for countries', name: 'cities' })
    cities(@Args('country') country: number,): ResponseModelCities {
      return this.countrieService.getCities(country);
    }

    @Query(() => DataDto, { description: 'This method returns a list of countries', name: 'typeDocs' })
    async typeDoc(): Promise<DataDto>{      
      return await this.resources.getTypeDoc();
    }

    @Query(() => DataDto, { description: 'This method returns a list of countries', name: 'roles' })
    async roles(): Promise<DataDto>{      
      return await this.resources.getRoles();
    }
}
