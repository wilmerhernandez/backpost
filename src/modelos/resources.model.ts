import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class DataItemDto {
  @Field(() => Int)
  key: number;

  @Field()
  value: string;
}


  @ObjectType()
  export class DataDto {
    @Field(() => [DataItemDto])
    data: DataItemDto[];
  } 