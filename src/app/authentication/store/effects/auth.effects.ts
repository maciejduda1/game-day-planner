import { User } from './../../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import * as routActions from '../../../store/actions/router.actions';
import { AuthService } from './../../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private getAuthService: AuthService,
    private angFirebase: AngularFireAuth,

  ) {}

@Effect()
  register$ = this.action$
    .ofType(authActions.REGISTER)
    .pipe(
      switchMap((action: authActions.Register) => {
        return this.getAuthService
          .registerUser(action.payload.email, action.payload.password)
          .then(
            res => {
              const user = this.angFirebase.auth.currentUser;
              const newUser: User = {
                userName: action.payload.name,
                email: action.payload.email,
                photoURL: action.payload.avatarUrl,
                uid: res.user.uid,
                events: []
              };
              this.getAuthService.addUserDataToDatabase(newUser);
              user.updateProfile({
                displayName: action.payload.name, photoURL: action.payload.avatarUrl
              }).then( res2 => res2 ).catch( error => console.error(error));
              return new authActions.RegisterSuccess(newUser);
            }
          )
          .catch(
            error => new authActions.RegisterFail(error)
          );
      })
    );

  @Effect()
  login$ = this.action$
      .ofType(authActions.LOGIN)
      .pipe(
        switchMap((action: authActions.Login) => {
          return this.getAuthService
            .loginUser(action.payload.email, action.payload.password)
            .then(
              res => {
                console.log('user: ', this.angFirebase.auth.currentUser);
                const user = this.angFirebase.auth.currentUser;
                const userDatabaseData = this.getAuthService.getUserDatabaseData(user.uid);
                const newUser: User = {
                  uid: user.uid,
                  photoURL: user.photoURL,
                  userName: user.displayName,
                  email: user.email,
                };
                return new authActions.LoginSuccess(userDatabaseData);
              }
            )
            .catch(
              error => console.error(error)
            );
        })
      );
  @Effect()
  logout$ = this.action$
    .ofType(authActions.LOGOUT)
    .pipe(
      switchMap((action: authActions.Logout) => {
        console.log('to się zgłasza');
        return this.getAuthService
        .logoutUser()
        .then(
          () => new authActions.LogoutSuccess
        )
        .catch(
          error => console.log('errror! ', error)
        );
      })
    );

  @Effect()
  goMain$ = this.action$
    .ofType(authActions.LOGIN_SUCCESS)
    .pipe(
      map((action: authActions.LoginSuccess) => {
        return new routActions.Go({path: ['/main']});
      })
    );

  @Effect()
  goMainReg$ = this.action$
    .ofType(authActions.REGISTER_SUCCESS)
    .pipe(
      map((action: authActions.RegisterSuccess) => {
        return new routActions.Go({path: ['/main']});
      })
    );
}
