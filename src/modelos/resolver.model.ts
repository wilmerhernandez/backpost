import { Field, Int, ObjectType } from "@nestjs/graphql";
import { DataResponse } from "./response.dto";



@ObjectType()
export class DataUser {
  @Field()
  name: string;

  @Field()
  email: string;
}
@ObjectType()
export class LoginData {
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  pass?: string;
  @Field({ nullable: true })
  rol?: string;  
  @Field({ nullable: true })
  dataUser?: DataUser;
  @Field({ nullable: true })
  data: DataResponse;
}


@ObjectType()
export class RegisterResponse {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;
}
