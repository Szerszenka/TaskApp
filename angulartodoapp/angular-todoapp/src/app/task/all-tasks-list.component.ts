import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-all-tasks-list',
  templateUrl: './all-tasks-list.component.html'
})
export class AllTasksListComponent implements OnInit {

  tasks: Task[];
  username: String;

  constructor(private router: Router, private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks()
    .subscribe( data => {
      this.tasks = data;
    });
  }

}
