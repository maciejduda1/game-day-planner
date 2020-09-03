import { DatabaseAuthUser } from './../../../models/user.model';
import * as fromAuthActions from '../actions/auth.actions';

export interface AuthState {
	signedIn: boolean;
	user: DatabaseAuthUser;
	serverError: string;
	isLoading: boolean;
	updatingProfile: boolean;
	updatingProfileSuccess: boolean;
}

const initialState: AuthState = {
	signedIn: false,
	user: new DatabaseAuthUser(),
	serverError: '',
	isLoading: false,
	updatingProfile: false,
	updatingProfileSuccess: false,
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
				isLoading: true,
			};

		case fromAuthActions.REGISTER_SUCCESS:
		case fromAuthActions.LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				signedIn: true,
			};

		case fromAuthActions.UPDATE_PROFILE:
			return {
				...state,
				updatingProfile: true,
				updatingProfileSuccess: false,
			};

		case fromAuthActions.UPDATE_PROFILE_FAIL:
			return {
				...state,
				updatingProfile: false,
				updatingProfileSuccess: false,
			};

		case fromAuthActions.UPDATE_PROFILE_SUCCESS:
			const newUserData = {
				...state.user,
				...action.payload,
			};
			return {
				...state,
				user: newUserData,
				updatingProfile: false,
				updatingProfileSuccess: true,
			};
		case fromAuthActions.REGISTER_FAIL:
		case fromAuthActions.LOGIN_FAIL:
			return {
				...state,
				isLoading: false,
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
export const getIsLoading = (state: AuthState) => state.isLoading;
export const getUpdatingProfile = (state: AuthState) => state.updatingProfile;
export const getUpdatingProfileSuccess = (state: AuthState) =>
	state.updatingProfileSuccess;
