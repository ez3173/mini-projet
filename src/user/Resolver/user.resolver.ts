import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserUsecase } from '../Usecase/user.usecase';
import { UserEntity as User } from '../Entity/userEntity';
import { CreateUserDto } from '../Dto/create-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Mutation(() => User, { name: 'registerUser' })
  async register(@Args('dto') dto: CreateUserDto): Promise<User> {
    return this.userUsecase.register(dto);
  }
}
