import { Controller, Get, Post, Body, Delete, Put, Param, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, SearchOrDeleteTaskDto } from './tasks-dto';
import { TaskStatus, Task } from './tasks.model';
import { SearchFiltersDTO } from './tasks-filter-dto';

@Controller('tasks')
export class TasksController {
   constructor(private srvTasksService: TasksService) { }

   /* -------------------------------------------------------------------------- */
   /*                                   Get all                                  */
   /* -------------------------------------------------------------------------- */

   @Get()
   getTasks() {
      return this.srvTasksService.getAllTasks()
   }

   @Get('search')
   searchTasks(@Query() search_dto: SearchFiltersDTO): Task[] {
      if (!Object.keys(search_dto).length) {
         this.getTasks()
      }
      return this.srvTasksService.searchFilter(search_dto)
   }
   /* -------------------------------------------------------------------------- */
   /*                                  Get by id                                 */
   /* -------------------------------------------------------------------------- */

   @Get('/:id')
   searchTask(@Param('id') id: string) {
      return this.srvTasksService.searchTask(id)
   }

   /* -------------------------------------------------------------------------- */
   /*                                Update status                               */
   /* -------------------------------------------------------------------------- */

   @Patch(':id/status')
   updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
      return this.srvTasksService.updateTaskStatus(id, status)
   }

   /* -------------------------------------------------------------------------- */
   /*                                   Create                                   */
   /* -------------------------------------------------------------------------- */

   @Post()
   createTasks(@Body() createTaskDto: CreateTaskDto) {
      return this.srvTasksService.createTasks(createTaskDto);
   }

   /* -------------------------------------------------------------------------- */
   /*                                Delete by id                                */
   /* -------------------------------------------------------------------------- */

   @Delete(':id')
   deleteTask(@Param() deleteTaskDto: SearchOrDeleteTaskDto) {
      return this.srvTasksService.deleteTask(deleteTaskDto)
   }

}
