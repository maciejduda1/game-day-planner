import { AuthService } from './../authentication/services/auth.service';
import { User } from './../models/user.model';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { Store } from '@ngrx/store';

import * as fromAuthStore from '../authentication/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnChanges {
  uid$: Observable<any>;
  uidSub: Subscription;
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
          console.log('Ktoś jest zalogowany');
          userDatabaseData$.subscribe(
            userData => {
              if (userData) {
                return this.authStore.dispatch( new fromAuthStore.LoginSuccess(userData));
              }
            }
          );
          this.uid = authState.uid;
        }
      }
    );
  }

  ngOnChanges() {
    this.uidSub.unsubscribe();
  }

}
