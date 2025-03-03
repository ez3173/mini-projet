import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
