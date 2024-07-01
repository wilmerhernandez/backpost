import { Module } from '@nestjs/common';
import { CountriesService } from './countries/countries/countries.service';

@Module({
    providers:[CountriesService],
    exports:[CountriesService]
})
export class DominioModule {}
