import { AuthService } from './../authentication/services/auth.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Store } from '@ngrx/store';

import * as fromAuthStore from '../authentication/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  uid$: Observable<any>;
  uid: any;

  constructor(private angFirebase: AngularFireAuth, private authStore: Store<fromAuthStore.AuthState>, private authService: AuthService) { }

  ngOnInit() {
    this.uid$ = this.angFirebase.authState;
    this.uid$.subscribe(
      authState => {
        if (!authState) {
          console.log('Nikt nie jest zalogowany');
          this.uid = null;
        } else {
          const userDatabaseData$ = this.authService.getUserDatabaseData(authState.uid);
          userDatabaseData$.subscribe(
            userData => this.authStore.dispatch( new fromAuthStore.LoginSuccess(userData))
          );


          // const user: User = {
          //   uid: authState.uid,
          //   userName: authState.displayName,
          //   email: authState.email,
          //   photoURL: authState.photoURL
          // };

          // console.log('uuid ', user);
          this.uid = authState.uid;
        }
      }
    );
  }

}
