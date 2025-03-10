import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './user/auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
