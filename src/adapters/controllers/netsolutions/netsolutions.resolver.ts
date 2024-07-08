import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountriesService } from 'src/dominio/countries/countries/countries.service';
import { LoginService } from 'src/dominio/login/login.service';
import { KeyValueDTO, ResponseModelCities } from 'src/modelos/countries.dto';
import { LoginData, LoginResponse, RegisterResponse } from 'src/modelos/resolver.model';




@Resolver()
export class NetsolutionsResolver {

  constructor(private readonly countrieService:CountriesService,private loginService: LoginService){

  }

 


  @Query(() => LoginResponse, { description: 'This method is for login', name: 'login' })
  login(
    @Args('user') user: string,
    @Args('password') password: string,
  ): LoginResponse {
    let response = new LoginResponse();
    if (user === "admin" && password === "admin") {
      const data = new LoginData();
      data.token = "2jnfsjknfjdsnf";

      response.data = data;
      response.message = "Logged in";
      response.status = 200;
    } else {
      response.error = "Login error";
      response.message = "Not logged in";
      response.status = 100;
    }
    console.log(response,'response');
    return response;
  }

  @Query(() => [KeyValueDTO], { description: 'This method returns a list of countries', name: 'countries' })
  countries(): KeyValueDTO[] {
    return this.countrieService.getCountries();
  }

  @Query(() => ResponseModelCities, { description: 'it method is for countries', name: 'cities' })
  cities(@Args('country') country: number,): ResponseModelCities {
    return this.countrieService.getCities(country);
  }

  @Query(() => RegisterResponse, {
    description: 'it method is for register',
    name: 'register',
  })
  async register(
    @Args('user') user: string,
    @Args('password') password: string,    
    @Args('name') name: string,
    @Args('phone') phone: string,
  ): Promise<RegisterResponse> {
    let response = new RegisterResponse();
    response = (await this.loginService.createUser(user,password,name,phone));
   
    return response;
  }
}
