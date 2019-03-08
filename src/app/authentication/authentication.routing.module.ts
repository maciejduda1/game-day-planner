import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const authRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class AuthenticationRoutingModule {
}
