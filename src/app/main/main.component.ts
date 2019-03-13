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
    // .pipe(
    //   switchMap( authUser => {
    //     if (!authUser) {
    //       this.uid = null;
    //       return null;
    //     }
    //     this.uid = authUser.uid;
    //     return this.authService.getUserDatabaseData(authUser.uid).pipe(
    //       map (
    //         userData => {
    //           if (userData) {
    //             console.log(' User Data: ', userData);
    //             return this.authStore.dispatch( new fromAuthStore.LoginSuccess(userData));
    //           }
    //         }
    //       )
    //     );
    //   })
    // );
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
                console.log(' User Data: ', userData);
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
    console.log('unsub');
    this.uidSub.unsubscribe();
  }

}
