import { Module } from '@nestjs/common';
import { NetsolutionsResolver } from './netsolutions.resolver';
import { DominioModule } from 'src/dominio/dominio.module';
import { CountriesService } from 'src/dominio/countries/countries/countries.service';
import { LoginService } from 'src/dominio/login/login.service';

@Module({
  providers: [NetsolutionsResolver,CountriesService,LoginService],
  imports:[DominioModule]
})
export class NetsolutionsModule {}
