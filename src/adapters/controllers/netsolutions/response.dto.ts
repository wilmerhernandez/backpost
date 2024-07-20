import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class DataResponse {
  @Field(() => Int)
  status: number;

  @Field(() => String)
  method: string;

  @Field(() => String, { nullable: true })
  error?: string;
}
