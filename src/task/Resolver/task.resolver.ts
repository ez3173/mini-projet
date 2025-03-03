/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { TaskUsecase } from '../Usecase/task.usecase';
import { UseGuards } from '@nestjs/common';
import { Task as TaskEntity } from '../Entity/taskEntity';
import { Task } from '@prisma/client';
import { CreateTaskDto } from '../Dto/create-task.dto';
import { UpdateTaskDto } from '../Dto/update-task.dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql'; // 👈 Import GqlExecutionContext - ESSENTIAL

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskUsecase: TaskUsecase) {}

  @Mutation(() => TaskEntity, { name: 'createTask' })
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('dto') dto: CreateTaskDto,
    @Context() context: any, // 👈 Inject Context
  ): Promise<Task> {
    console.log('TaskResolver.createTask - Context object:', context); // Log context
    const gqlContext = GqlExecutionContext.create(context); // 👈 Create GqlExecutionContext
    const user = gqlContext.getContext()['user']; // 👈 Get user from GQL context
    console.log('TaskResolver.createTask - GraphQL Context User object:', user); // Log user
    const userId = user.sub; // Access userId from user.sub (JWT subject)
    return this.taskUsecase.createTask(userId, dto);
  }

  @Query(() => [TaskEntity], { name: 'tasksByUser' })
  @UseGuards(JwtAuthGuard)
  async getTasksByUser(@Context() context: any): Promise<Task[]> {
    console.log('TaskResolver.getTasksByUser - Context object:', context); // Log context
    const gqlContext = GqlExecutionContext.create(context); // 👈 Create GqlExecutionContext
    const user = gqlContext.getContext()['user']; // 👈 Get user from GQL context
    console.log(
      'TaskResolver.getTasksByUser - GraphQL Context User object:',
      user,
    ); // Log user
    const userId = user.sub; // Access userId from user.sub (JWT subject)
    return this.taskUsecase.getTasksByUser(userId);
  }

  @Mutation(() => TaskEntity, { name: 'updateTask' })
  @UseGuards(JwtAuthGuard) // Keep JwtAuthGuard for updateTask if you want it protected
  async updateTask(
    @Args('id') id: string,
    @Args('dto') dto: UpdateTaskDto,
  ): Promise<Task> {
    // **IF** updateTask should also be user-specific, you would need to
    // access the user from the context here as well, similar to createTask and getTasksByUser.
    // For now, it's left as is, assuming it's not user-specific based on your original code.
    return this.taskUsecase.updateTask(id, dto);
  }

  @Mutation(() => TaskEntity, { name: 'deleteTask' })
  @UseGuards(JwtAuthGuard) // Keep JwtAuthGuard for deleteTask if you want it protected
  async deleteTask(@Args('id') id: string): Promise<Task> {
    // **IF** deleteTask should also be user-specific, you would need to
    // access the user from the context here as well, similar to createTask and getTasksByUser.
    // For now, it's left as is, assuming it's not user-specific based on your original code.
    return this.taskUsecase.deleteTask(id);
  }
}
