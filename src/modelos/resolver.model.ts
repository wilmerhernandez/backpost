import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class loginModel {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;

  @Field()
  error: string;

  @Field()
  data: any;
}
