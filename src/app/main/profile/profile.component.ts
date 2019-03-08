import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromAuthStore from '../../authentication/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  edit = false;

  userData$: Observable<User>;
  userData: User;

  constructor(private authStore: Store<fromAuthStore.AuthState>) { }

  ngOnInit() {
    this.userData$ = this.authStore.select( fromAuthStore.getUserRole);
    this.userData$.subscribe(
      data => this.userData = data
    );
  }

  onSubmit(form: NgForm) {
    const formData = {
      displayName: form.value.name,
      photoURL: form.value.photoURL
    };
    console.log(formData);
  }

  editPersonalDataToggle() {
    this.edit = !this.edit;
  }


}
