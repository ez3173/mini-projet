import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskDto {
  @Field()
  @IsOptional()
  @IsString()
  title?: string;
  @Field()
  @IsOptional()
  @IsString()
  description?: string;
}
