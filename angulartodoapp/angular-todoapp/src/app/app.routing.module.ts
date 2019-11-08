import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import {AddUserComponent} from './user/add-user.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { AllTasksListComponent } from './task/all-tasks-list.component';
import { EditTaskComponent } from './task/edit-task.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: AddUserComponent },
  { path: 'tasks/all', component: AllTasksListComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'tasks/edit', component: EditTaskComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }