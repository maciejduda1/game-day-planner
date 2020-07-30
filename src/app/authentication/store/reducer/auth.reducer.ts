import { DatabaseAuthUser } from './../../../models/user.model';
import * as fromAuthActions from '../actions/auth.actions';

export interface AuthState {
	signedIn: boolean;
	user: DatabaseAuthUser;
	serverError: string;
}

const initialState: AuthState = {
	signedIn: false,
	user: new DatabaseAuthUser(),
	serverError: '',
};

export function reducers(
	state = initialState,
	action: fromAuthActions.AuthActions,
) {
	switch (action.type) {
		case fromAuthActions.REGISTER:
		case fromAuthActions.LOGIN:
			return {
				...state,
				serverError: '',
			};

		case fromAuthActions.REGISTER_SUCCESS:
		case fromAuthActions.LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				signedIn: true,
			};

		case fromAuthActions.REGISTER_FAIL:
		case fromAuthActions.LOGIN_FAIL:
			return {
				...state,
				signedIn: false,
				serverError: action.payload,
			};

		case fromAuthActions.LOGOUT_SUCCESS:
			return initialState;

		default:
			return state;
	}
}

export const getUserRole = (state: AuthState) => state.user;
export const getLoginState = (state: AuthState) => state.signedIn;
export const getServerError = (state: AuthState) => state.serverError;
export const getUserUid = (state: AuthState) => state.user.uid;
