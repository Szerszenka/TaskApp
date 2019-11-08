import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule, MatButtonModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app.routing.module';
import { UserService } from './user/user.service';
import { HttpClientModule } from "@angular/common/http";
import { AddUserComponent } from './user/add-user.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { AllTasksListComponent } from './task/all-tasks-list.component';
import { EditTaskComponent } from './task/edit-task.component';
import { ComfirmDialog } from './task/comfirm_dialog/comfirm-dialog.component';
import { AddDialog } from './task/add_dialog/add-dialog.component';
import { AddListDialog } from './task/add_list_dialog/add-list-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    LoginComponent,
    TaskComponent,
    AllTasksListComponent,
    EditTaskComponent,
    ComfirmDialog,
    AddDialog,
    AddListDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, LoginService, TaskService],
  entryComponents: [
    ComfirmDialog,
    AddDialog,
    AddListDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }