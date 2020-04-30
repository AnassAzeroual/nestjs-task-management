import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus, Task } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { SearchOrDeleteTaskDto, CreateTaskDto } from './tasks-dto';
import { SearchFiltersDTO } from './tasks-filter-dto';

@Injectable()

export class TasksService
{
    private tasks:Task[] = []

    getAllTasks()
    {
        return this.tasks
    }

    createTasks (createTaskDto:CreateTaskDto)
    {
        const { title, description } = createTaskDto

        const taskData:Task = {
            id:uuidv1(),
            title,
            description,
            status: TaskStatus.DONE
        };

        this.tasks.push(taskData)
        return this.tasks
    }

    searchTask (id:string)
    {
        const res = this.tasks.find(x => x.id == id);
        if (!res)
        {
            throw new NotFoundException(`No Result of This ID: ${id}`)
        }
        return res
    }

    deleteTask (deleteTaskID:SearchOrDeleteTaskDto)
    {
        this.tasks = this.tasks.filter(x => x.id != deleteTaskID.id)
    }

    updateTaskStatus(id , status: TaskStatus)
    {
        const task = this.searchTask(id);
        
        task.status = status
        return task
    }

    searchFilter(search_dto:SearchFiltersDTO)
    {
        const {status,search} = search_dto

       let allTasks = this.getAllTasks()

        let result = []

        if (status) {
            result = allTasks.filter(x => x.status === status)
        }

        if (search) {
            result = result.filter(s => (s.title.includes(search)) || (s.description.includes(search)) )
        }

        return result
    }

}
