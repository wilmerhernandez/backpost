import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginData {
  @Field()
  token: string;
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
