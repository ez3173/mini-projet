import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
