import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Task } from '../models/task.model';
import { TaskService } from './task.service';

import { ComfirmDialog } from './comfirm_dialog/comfirm-dialog.component';
import { AddDialog } from './add_dialog/add-dialog.component';
import { AddListDialog } from './add_list_dialog/add-list-dialog.component';
import { ListTasks } from '../models/listTasks.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  listsTasks: ListTasks[];
  username: String;
  name: String;
  taskName: String;
  taskDesc: String;

  constructor(private router: Router, private taskService: TaskService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('logged');
    this.getListsTasksForLoggedUser();
    if(this.username == null) {
      this.tasks = null;
    }
  };

  getListsTasksForLoggedUser() {
    if(this.username != null) {
      this.taskService.getListsTasksForUser(this.username)
      .subscribe( data => {
        this.listsTasks = data;
      });
    } else {
        this.listsTasks = null;
    }
  }


  addTask() {
    const dialogRef = this.dialog.open(AddDialog, {
      data: {
        taskName: this.taskName,
        taskDesc: this.taskDesc}
      });
  
    dialogRef.afterClosed().subscribe( 
      data => { 
         console.log(data);
         this.taskService.createTask(data.taskName, data.taskDesc).subscribe( 
           data => {
            this.taskService.getTasksForList(localStorage.getItem("listName")).subscribe(
              data => {
                this.tasks = data;
              });
           },
           error => {
             console.log(error);
             alert('Error with creating new task.');
           },
           () => {
             this.ngOnInit();
         });
       },
       error => {
         console.log(error);
       },
       () => {
        this.ngOnInit();
         this.router.navigate(['/tasks']);
       });
  }

  selectList(listTasksName) {
    if(listTasksName == "add") {
      this.openAddListModal();
    } else {
    this.taskService.getTasksForList(listTasksName)
        .subscribe( 
        data => {
          this.tasks = data;
        },
        error => {
          console.log(error);
          alert('Error with showing tasks.');
        },
        () => {
          localStorage.setItem('listName', listTasksName);
          this.router.navigate(['/tasks']);
      });
    }
  }

  public onChange(event) {   
    const checked = event.target.checked;  
    if(checked) {
      this.openModal(event.target.value);
    }
  }

  deleteTask(task) {
    this.taskService.deleteTask(task)
    .subscribe( data => {
      this.tasks = this.tasks.filter(u => u !== task);
    });
  }

  openModal(taskName) {
    const dialogRef = this.dialog.open(ComfirmDialog);
    dialogRef.afterClosed().subscribe(
      data => { 
        if(data) {
            this.taskService.setDone(taskName).subscribe( 
              data => {
                
              },
              error => {
                console.log(error);
                alert('Error with creating setting done.');
              },
              () => {
                this.ngOnInit();
            });
        }
    });
  }

  openAddListModal() {
    const dialogRef = this.dialog.open(AddListDialog, {
      data: {
        name: this.name}
      });

    dialogRef.afterClosed().subscribe( 
     data => { 
        console.log(data);
        this.taskService.createList(data.name, data.desc).subscribe( 
          data => {
            
          },
          error => {
            console.log(error);
            alert('Error with creating new list.');
          },
          () => {
            this.ngOnInit();
        });
      },
      error => {
        console.log(error);
      },
      () => {
        this.ngOnInit();
        this.router.navigate(['/tasks']);
      });
    }
}
