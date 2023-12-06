import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  /*
  passare i dati ai figli o un'altra interfaccia
  https://youtu.be/AP1t2bR7Ups?si=qcl7FtYMb0gam8r7

  https://stackoverflow.com/questions/50284714/using-routerlink-and-click-in-same-button
  https://www.digitalocean.com/community/tutorials/angular-navigation-routerlink-navigate-navigatebyurl
  */
  title = 'Registrazione';
  errorMessage = '';
  buttonLogin = 'Torna al Login';
  buttonRegister = 'Registrati';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: SnackBarService
  ) {}

  registerForm = this.formBuilder.group({
    email: this.formBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.formBuilder.control('', Validators.required),
    /*
    password: this.formBuilder.control('', Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))
    */
  });

  @HostListener('document:keydown.enter')
  onDocumentKeydownEnter() {
    if(this.registerForm.valid){
      this.onRegister();
    }
  }

  onRegister() {
    let Form = JSON.stringify(this.registerForm.value);
    this.dataService.InsertUser(Form).subscribe({
      next: (result) => {
        console.log(result);
        this.openSnackBar();
        this.router.navigate(['/login']);
      },
      error: (error: HttpResponse<any>) => {
        //console.log(error)
        if (error.status == HttpStatusCode.Forbidden) {
          this.errorMessage = 'Esiste un utente con la stessa email';
          this.registerForm.controls.email.setErrors({ incorrect: true });
        } else {
          this.errorMessage = "Problema nell'invio dei dati";
        }
      },
    });
  }

  openSnackBar() {
    this.snackBar.openRegisterBar(
      'Registrazione avvenuta correttamente \n Esegui il login',
      'Chiudi'
    );
  }
}
