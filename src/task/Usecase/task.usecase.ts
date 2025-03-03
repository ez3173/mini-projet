import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../Dto/create-task.dto';
import { UpdateTaskDto } from '../Dto/update-task.dto';
import { Task } from '@prisma/client';
import { TaskRepository } from '../Repository/task.repository';

@Injectable()
export class TaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(userId: string, dto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(dto.title, userId, dto.description);
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskRepository.getTaskByUser(userId);
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.updateTask(id, dto);
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskRepository.deleteTask(id);
  }
}
