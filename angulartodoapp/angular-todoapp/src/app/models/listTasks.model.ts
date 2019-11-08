import { Task } from './task.model';

export class ListTasks {
    id: String;
    name: String;
    desc: String;
    owner: String;
    tasksList: Task[]
}