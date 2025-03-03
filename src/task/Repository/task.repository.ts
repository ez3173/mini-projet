import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(
    title: string,
    userId: string,
    description?: string,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        userId,
        description,
      },
    });
  }

  async getTaskByUser(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
