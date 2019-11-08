import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: ['./comfirm-dialog.component.css']
})
export class ComfirmDialog  {

    constructor(
    public dialogRef: MatDialogRef<ComfirmDialog>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

}
