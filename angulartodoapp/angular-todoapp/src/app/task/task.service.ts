import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Task } from '../models/task.model';
import { ListTasks } from '../models/listTasks.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {

  constructor(private http:HttpClient) {}

  private userUrl = 'http://localhost:8080/api/tasks';
  //private userUrl = '/api';

  public getTasks() {
    return this.http.get<Task[]>(this.userUrl + '/all');
  }

  /*public getTasksForUser(username) {
    return this.http.post<Task[]>(this.userUrl, username);
  }*/

  public getListsTasksForUser(username) {
    return this.http.post<ListTasks[]>(this.userUrl, username);
  }

  public getTasksForList(listTaskName) {
    return this.http.get<Task[]>(this.userUrl + '/' + listTaskName);
  }

  public createList(name, desc) {
    let params = new HttpParams()
    .set('name', name)
    .set('owner', localStorage.getItem("logged"));

    return this.http.get(this.userUrl + '/add', { params: params });
  }

  public createTask(taskName, taskDesc) {
    let params = new HttpParams()
    .set('taskName', taskName)
    .set('taskDesc', taskDesc)
    .set('listName', localStorage.getItem("listName"))
    .set('owner', localStorage.getItem("logged"));

    return this.http.get(this.userUrl + '/addTask', { params: params });
  }

  public setDone(taskName) {
    let params = new HttpParams()
    .set('taskName', taskName)
    .set('listName', localStorage.getItem('listName'));
    return this.http.get(this.userUrl + '/taskDone', { params: params });
  }

  public deleteTask(task) {
    return this.http.delete(this.userUrl + "/"+ task.taskName);
  }
}
