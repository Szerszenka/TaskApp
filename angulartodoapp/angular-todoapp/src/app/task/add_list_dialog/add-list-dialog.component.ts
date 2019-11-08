import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ListTasks } from 'src/app/models/listTasks.model';

@Component({
  selector: 'add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialog  {

    name: String;

    constructor(
    public dialogRef: MatDialogRef<AddListDialog>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {}


}