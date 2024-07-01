import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountriesService } from 'src/dominio/countries/countries/countries.service';




@Resolver()
export class NetsolutionsResolver {

  constructor(private readonly countrieService:CountriesService){

  }


  @Query(() => String, { description: 'it method is for login', name: 'login' })
  login(
    @Args('user') user: string,
    @Args('password') password: string,
  ): string {
    let response:{status:number,message:string,data?:{token:string},error?:string};
    if(user=="admin" && password=="admin"){
      response={status:200,message:"Inicio",data:{token:"sakduriusbdsbifdsu"}};
    }else{
      response={status:100,message:"No pudiste iniciar session",error:"Datos incorrectos"};
    }
    return JSON.stringify(response);
  }

  @Query(() => String, { description: 'it method is for countries', name: 'countries' })
  countries(): string{
    return JSON.stringify(this.countrieService.getCountries());
  }

  @Query(() => String, { description: 'it method is for countries', name: 'cities' })
  cities(@Args('country') country: number,): string {
    return JSON.stringify(this.countrieService.getCities(country));
  }

  @Query(() => String, {
    description: 'it method is for register',
    name: 'register',
  })
  register(
    @Args('user') user: string,
    @Args('password') password: string,
  ): string {
    return 'Te registraste ' + user+"pass: "+password;
  }
}
