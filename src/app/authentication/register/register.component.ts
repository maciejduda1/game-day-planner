import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../store';
import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private routerStore: Store<fromRouterStore.State>, private authStore: Store<fromAuthStore.AuthState>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authStore.dispatch( new fromAuthStore.Register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      avatarUrl: form.value.avatarUrl || '',
    }));
  }

  goLogin() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main']}));
  }

}
