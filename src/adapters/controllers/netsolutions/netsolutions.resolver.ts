import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { LoginService } from 'src/dominio/login/login.service';
import { DataUser, LoginData, RegisterResponse } from 'src/modelos/resolver.model';
import { DataResponse } from './response.dto';




@Resolver()
export class NetsolutionsResolver {

  constructor(private loginService: LoginService){

  }

 
  @Mutation(() => LoginData, { description: 'This method is for login', name: 'login' })
  async login(
    @Args('user') user: string,
    @Args('password') password: string,
  ): Promise<LoginData> {
    let response = new LoginData();
    let data = new DataResponse();
    let dataUser = new DataUser();
    let dataResponse = await this.loginService.Login(user);
    console.log(atob(dataResponse.key),"contraseña");
    console.log(password,"contraseña");
    if (password == atob(dataResponse.key)) {
      data.status = 200;
      data.method = "Login";
      response.data = data;
      response.pass = "OK";
      response.token = dataResponse.token;
      response.rol = dataResponse.rol;
      dataUser.email = dataResponse.dataUser.email;
      dataUser.name = dataResponse.dataUser.name;
      response.dataUser = dataUser;
    } else {
      data.status = 400;
      data.method = "Login";
      data.error = "Error al en usuario o contraseña"
      response.data = data;
    }
    console.log(response, 'response');
    return response;
  }
  
  // Mutación para el método register
  @Mutation(() => RegisterResponse, {
    description: 'This method is for register',
    name: 'register',
  })
  async register(
    @Args('user') user: string,
    @Args('password') password: string,    
    @Args('name') name: string,
    @Args('typeDoc') typeDoc: string,
    @Args('doc') doc: string,
    @Args('companyName') companyName: string,
    @Args('companyTypeDoc') companyTypeDoc: string,
    @Args('companyDoc') companyDoc: string,
    @Args('phone') phone: string,
    @Args('rol') rol: string,
  ): Promise<RegisterResponse> {
    let response = new RegisterResponse();
    response = await this.loginService.createUser(user, password, name, phone, typeDoc, doc, companyName, companyTypeDoc, companyDoc, rol);
    
    return response;
  }


}
