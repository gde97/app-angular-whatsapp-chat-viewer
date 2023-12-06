import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/login'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'chats', component:MainComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }