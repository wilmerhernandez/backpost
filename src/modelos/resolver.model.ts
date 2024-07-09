import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginData {
  @Field()
  token: string;
  @Field()
  pass: string;
  @Field()
  rol: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;

  @Field({ nullable: true })
  data?: LoginData;

  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;
}
