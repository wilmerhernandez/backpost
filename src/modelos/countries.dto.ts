import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class KeyValueDTO {
  @Field()
  key: number;

  @Field()
  value: string;
}
 
@ObjectType()
export class ResponseModelCities {
  @Field()
  status: number;

  @Field({ nullable: true })
  error?: string;

  @Field(type => [KeyValueDTO], { nullable: true })
  data?: KeyValueDTO[];
}