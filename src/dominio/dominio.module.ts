import { Module } from '@nestjs/common';
import { CountriesService } from './countries/countries/countries.service';
import { LoginService } from './login/login.service';
import { ResourcesService } from './resources/resources.service';
import { FirebaseService } from './firebase/firebase.service';

@Module({
    providers:[CountriesService, LoginService, ResourcesService, FirebaseService],
    exports:[CountriesService,LoginService, ResourcesService, FirebaseService]
})
export class DominioModule {}
