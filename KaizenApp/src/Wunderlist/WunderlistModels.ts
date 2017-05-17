
import * as moment from "moment";

export interface StorageData {
    lists: TaskList[];
}

export interface TaskList {
    id: number;
    name: string;
    revision: number;

    pendingTasks: Task[];
    completedTasks: Task[];
}

export interface Task {
    id: number;
    revision: number;
    createdAt: moment.Moment;
    completed: boolean;
    completedAt: moment.Moment;
    listId: number;
}