import { Component, HostListener} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dataStructure';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DataService } from 'src/app/services/data.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /*
  passare i dati ai figli o un'altra interfaccia
  https://youtu.be/AP1t2bR7Ups?si=qcl7FtYMb0gam8r7

  https://stackoverflow.com/questions/50284714/using-routerlink-and-click-in-same-button
  https://www.digitalocean.com/community/tutorials/angular-navigation-routerlink-navigate-navigatebyurl

  https://careydevelopment.us/blog/angular-material-how-to-manually-mark-a-form-field-as-invalid

  https://stackoverflow.com/questions/46760306/get-angular-material-theme-color-scheme-palette-for-other-elements
  
  https://stackoverflow.com/questions/40653758/angular-2-prevent-enter-from-submitting-in-template-driven-form
  */
  title = 'Login';
  errorMessage = '';
  buttonLogin = 'Accedi';
  buttonRegister = 'Nuovo utente';
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private sessionStorageService: SessionStorageService
  ) {}

  loginForm = this.formBuilder.group({
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
    if(this.loginForm.valid){
      this.onLogin();
    }
  }

  onLogin() {
    let Form = JSON.stringify(this.loginForm.value);
    this.dataService.getLogin(Form).subscribe({
      next: (result: User) => {
        this.user = result;
        //console.log(result);
        this.sessionStorageService.saveUser(this.user)
        //this.dataSharingService.refreschChats.next(true);
        this.router.navigate(['/chats']);
      },
      error: (error) => {
        //console.log(error);
        this.errorMessage = 'Credenziali errate';
        this.loginForm.controls.email.setErrors({ incorrect: true });
        this.loginForm.controls.password.setErrors({ incorrect: true });
      },
    });
  }

}
