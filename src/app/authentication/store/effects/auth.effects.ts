import { DatabaseAuthUser } from './../../../models/user.model';
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
	register$ = this.action$.ofType(authActions.REGISTER).pipe(
		switchMap((action: authActions.Register) => {
			return this.getAuthService
				.registerUser(action.payload.email, action.payload.password)
				.then((res) => {
					const user = this.angFirebase.auth.currentUser;
					const newUser: DatabaseAuthUser = {
						userName: action.payload.name,
						email: action.payload.email,
						photoURL: action.payload.avatarUrl,
						uid: res.user.uid,
					};
					this.getAuthService.addUserDataToDatabase(newUser);
					user.updateProfile({
						displayName: action.payload.name,
						photoURL: action.payload.avatarUrl,
					})
						.then((res2) => res2)
						.catch((error) => console.error(error));
					return new authActions.RegisterSuccess(newUser);
				})
				.catch((error) => new authActions.RegisterFail(error.message));
		}),
	);

	@Effect()
	login$ = this.action$.ofType(authActions.LOGIN).pipe(
		switchMap((action: authActions.Login) => {
			return this.getAuthService
				.loginUser(action.payload.email, action.payload.password)
				.then((res: firebase.auth.UserCredential) => {
					const { user } = res;
					const newUser: DatabaseAuthUser = {
						uid: user.uid,
						photoURL: user.photoURL,
						userName: user.displayName,
						email: user.email,
					};

					return new authActions.LoginSuccess(newUser);
				})
				.catch((error) => new authActions.LoginFail(error.message));
		}),
	);
	@Effect()
	logout$ = this.action$.ofType(authActions.LOGOUT).pipe(
		switchMap((action: authActions.Logout) => {
			return this.getAuthService
				.logoutUser()
				.then(() => new authActions.LogoutSuccess())
				.catch((error) => console.log('errror! ', error));
		}),
	);

	@Effect()
	goMain$ = this.action$.ofType(authActions.LOGIN_SUCCESS).pipe(
		map((action: authActions.LoginSuccess) => {
			return new routActions.Go({ path: ['/main'] });
		}),
	);

	@Effect()
	goAuth$ = this.action$.ofType(authActions.LOGOUT_SUCCESS).pipe(
		map((action: authActions.LogoutSuccess) => {
			return new routActions.Go({ path: ['/auth'] });
		}),
	);

	@Effect()
	goMainReg$ = this.action$.ofType(authActions.REGISTER_SUCCESS).pipe(
		map((action: authActions.RegisterSuccess) => {
			return new routActions.Go({ path: ['/main'] });
		}),
	);
}
