import { Module } from '@nestjs/common';
import { NetsolutionsResolver } from './netsolutions.resolver';
import { DominioModule } from 'src/dominio/dominio.module';
import { CountriesService } from 'src/dominio/countries/countries/countries.service';
import { LoginService } from 'src/dominio/login/login.service';
import { FirebaseService } from 'src/dominio/firebase/firebase.service';

@Module({
  providers: [NetsolutionsResolver,CountriesService,LoginService,FirebaseService],
  imports:[DominioModule]
})
export class NetsolutionsModule {}
