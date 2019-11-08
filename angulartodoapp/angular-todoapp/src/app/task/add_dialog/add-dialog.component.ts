import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialog  {

    taskName: String;
    taskDesc: String;

    constructor(
    public dialogRef: MatDialogRef<AddDialog>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

}
