import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private routerStore: Store<fromRouterStore.State>, private authStore: Store<fromAuthStore.AuthState>) { }

  ngOnInit() {

  }

  goRegister() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main', 'auth', 'register']}));
  }

  onSubmit(form: NgForm) {
    this.routerStore.dispatch( new fromAuthStore.Login({
      email: form.value.email,
      password: form.value.password
    }));
  }

}
