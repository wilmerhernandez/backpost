import { Module } from '@nestjs/common';
import { CountriesService } from './countries/countries/countries.service';
import { LoginService } from './login/login.service';

@Module({
    providers:[CountriesService, LoginService],
    exports:[CountriesService]
})
export class DominioModule {}
