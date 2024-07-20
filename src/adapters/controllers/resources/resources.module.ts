import { Module } from '@nestjs/common';
import { ResourcesResolver } from './resources.resolver';
import { ResourcesService } from 'src/dominio/resources/resources.service';
import { FirebaseService } from 'src/dominio/firebase/firebase.service';
import { CountriesService } from 'src/dominio/countries/countries/countries.service';

@Module({
  providers: [ResourcesResolver,ResourcesService,FirebaseService,CountriesService]
})
export class ResourcesModule {}
