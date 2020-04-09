import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, SearchOrDeleteTaskDto } from './tasks-dto';

@Controller('tasks')
export class TasksController {
   constructor(private srvTasksService:TasksService) {}

   @Get ()
   getTasks()
   {
        return this.srvTasksService.getAllTasks()
   }

   @Post ()
   createTasks(@Body() createTaskDto:CreateTaskDto)
   {
        console.log('body',createTaskDto.title);
        return this.srvTasksService.createTasks(createTaskDto)
   }

   @Put (':id')
   searchTask(@Param() deleteTaskDto:SearchOrDeleteTaskDto)
   {
       return this.srvTasksService.searchTask(deleteTaskDto)
   }

   @Delete (':id')
   deleteTask(@Param() deleteTaskDto:SearchOrDeleteTaskDto)
   {
       return this.srvTasksService.deleteTask(deleteTaskDto)
   }
    
}
