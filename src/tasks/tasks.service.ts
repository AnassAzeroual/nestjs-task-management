import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { SearchOrDeleteTaskDto, CreateTaskDto } from './tasks-dto';
@Injectable()
export class TasksService {
    private tasks:Task[] = []

    async getAllTasks()
    {
        return await this.tasks
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

    searchTask (deleteTaskID:SearchOrDeleteTaskDto)
    {
        return this.tasks.find(x => x.id == deleteTaskID.id)
    }

    deleteTask (deleteTaskID:SearchOrDeleteTaskDto)
    {
        this.tasks = this.tasks.filter(x => x.id != deleteTaskID.id)
    }


}
