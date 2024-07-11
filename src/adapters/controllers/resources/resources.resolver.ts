import { Query, Resolver } from '@nestjs/graphql';
import { ResourcesService } from 'src/dominio/resources/resources.service';
import { DataDto } from 'src/modelos/resources.model';

@Resolver()
export class ResourcesResolver {

    constructor(private resources:ResourcesService){
        
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
