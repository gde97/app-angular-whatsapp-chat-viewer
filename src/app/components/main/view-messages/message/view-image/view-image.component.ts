import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css'],
})
export class ViewImageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { source: string },
    private dialogRef: MatDialogRef<ViewImageComponent>
  ) {}

  closeDialog(){
    this.dialogRef.close();
  }
}
