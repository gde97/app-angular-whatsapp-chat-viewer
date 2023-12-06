import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  /*
  https://stackoverflow.com/questions/53883827/matsnackbar-panelclass-doesnt-read-styling-class
  */

  constructor(private snackBar: MatSnackBar) {}

  openRegisterBar(message: string, button: string) {
    /* class snackBarMy is in scr/styles.css */
    this.snackBar.open(message, button, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 8000,
      panelClass: 'snackBarRegister',
    });
  }
}
