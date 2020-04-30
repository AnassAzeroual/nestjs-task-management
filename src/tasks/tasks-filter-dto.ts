import { TaskStatus } from './tasks.model';

export class SearchFiltersDTO {
    status: TaskStatus;
    search: string;
}