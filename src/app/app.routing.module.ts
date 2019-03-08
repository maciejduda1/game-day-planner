// import { AuthGuard } from './login/guards/auth.guard';
// import { LoginFormComponent } from './login/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // { path: 'login', component: LoginFormComponent },
  { path: 'main', loadChildren: './main/main.module#MainModule'},
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
