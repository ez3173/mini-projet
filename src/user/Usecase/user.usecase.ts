import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../Repository/user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../Dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserUsecase {
  constructor(private userRepository: UserRepository) {}

  async register(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.userRepository.createUser(dto.email, passwordHash);
  }
}
