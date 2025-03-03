import { Module } from '@nestjs/common';
import { TaskResolver } from './Resolver/task.resolver';
import { TaskUsecase } from './Usecase/task.usecase';
import { TaskRepository } from './Repository/task.repository';
import { PrismaService } from 'src/prisma.service'; // Import PrismaService
import { AuthModule } from '../user/auth/auth.module';

@Module({
  imports: [AuthModule], // Importer le module AuthModule
  providers: [TaskResolver, TaskUsecase, TaskRepository, PrismaService], // Fournir les composants du module Task et PrismaService
})
export class TaskModule {}
