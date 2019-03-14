import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  passwordError = false;
  emailError = false;

  serverError$: Observable<string>;
  serverError: string;

  constructor(private routerStore: Store<fromRouterStore.State>, private authStore: Store<fromAuthStore.AuthState>) { }

  ngOnInit() {
    this.serverError$ = this.authStore.select( fromAuthStore.getServerError);
    this.serverError$.subscribe(
      value => this.serverError = value
    );
  }

  goRegister() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main', 'auth', 'register']}));
  }

  onSubmit(form: NgForm) {
    if ((form.value.email.trim().length >= 4) && (form.value.password.trim().length >= 4)) {
      this.emailError = false;
      this.passwordError = false;
      this.routerStore.dispatch( new fromAuthStore.Login({
        email: form.value.email,
        password: form.value.password
      }));
    } else if (form.value.email.trim().length < 3)  {
      this.emailError = true;
    } else if (form.value.password.trim().length < 4) {
      this.passwordError = true;
    }
  }

}
