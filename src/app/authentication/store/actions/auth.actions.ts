import { DatabaseAuthUser } from './../../../models/user.model';
import { Action } from '@ngrx/store';

export const LOGIN = '[auth] try to Login';
export const LOGIN_SUCCESS = '[auth] Login successfull';
export const LOGIN_FAIL = '[auth] Login failed';

export const REGISTER = '[auth] try to register';
export const REGISTER_SUCCESS = '[auth] register successfull';
export const REGISTER_FAIL = '[auth] register failed';

export const LOGOUT = '[auth] logout User';
export const LOGOUT_SUCCESS = '[auth] logout User Success';

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
	readonly type = LOGIN_SUCCESS;
	constructor(public payload: any) {}
}

export class LoginFail implements Action {
	readonly type = LOGIN_FAIL;
	constructor(public payload: any) {}
}

export class Register implements Action {
	readonly type = REGISTER;
	constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
	readonly type = REGISTER_SUCCESS;
	constructor(public payload: DatabaseAuthUser) {}
}

export class RegisterFail implements Action {
	readonly type = REGISTER_FAIL;
	constructor(public payload: any) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

export class LogoutSuccess implements Action {
	readonly type = LOGOUT_SUCCESS;
}

export type AuthActions =
	| Login
	| LoginFail
	| LoginSuccess
	| Register
	| RegisterFail
	| RegisterSuccess
	| Logout
	| LogoutSuccess;
