import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './Repository/user.repository';
import { UserResolver } from './Resolver/user.resolver';
import { UserUsecase } from './Usecase/user.usecase';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [UserUsecase, UserResolver, UserRepository, PrismaService],
  exports: [UserUsecase, UserRepository],
})
export class UserModule {}
