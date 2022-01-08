import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaskRepositary } from './task.repositary';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepositary])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
