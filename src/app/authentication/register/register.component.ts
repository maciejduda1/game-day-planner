import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  wrongPassword = false;
  serverError$: Observable<string>;
  serverError: string;
  constructor(private routerStore: Store<fromRouterStore.State>, private authStore: Store<fromAuthStore.AuthState>) { }

  ngOnInit() {
    this.wrongPassword = false;

    this.serverError$ = this.authStore.select( fromAuthStore.getServerError);
    this.serverError$.subscribe(
      value => this.serverError = value
    );
  }

  onSubmit(form: NgForm) {
    console.log('form valid: ', form.valid);
    if (form.value.password !== form.value.rePassword) {
      this.wrongPassword = true;
      console.log('złe hasło', this.wrongPassword);
    } else if (
      form.valid &&
      form.value.password === form.value.rePassword &&
      (form.value.email.trim().length >= 4) &&
      (form.value.password.trim().length >= 4) &&
      (form.value.name.trim().length >= 5) &&
      form.value.secret === 'MaczokPower'
      ) {
      this.wrongPassword = false;
      this.authStore.dispatch( new fromAuthStore.Register({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        avatarUrl: form.value.avatarUrl || '',
      }));
    }
  }

  goLogin() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main']}));
  }

}
