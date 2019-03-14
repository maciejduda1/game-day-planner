import { User } from './../../../models/user.model';
import * as fromAuthActions from '../actions/auth.actions';

export interface AuthState {
  signedIn: boolean;
  user: User;
  serverError: string;
}

const initialState: AuthState = {
  signedIn: false,
  user: new User,
  serverError: ''
};

export function reducers(state = initialState, action: fromAuthActions.AuthActions) {
  switch (action.type) {
    case (fromAuthActions.REGISTER_SUCCESS):
    case (fromAuthActions.LOGIN_SUCCESS):
    // console.log('reducer ', action.payload);
      return {
        ...state, user: action.payload, signedIn: true, serverError: ''
      };

    case (fromAuthActions.REGISTER_FAIL):
    case (fromAuthActions.LOGIN_FAIL):
      return {
        ...state, signedIn: false, serverError: action.payload
      };

    case (fromAuthActions.LOGOUT_SUCCESS):
      return initialState;

    default:
      return state;
  }
}

export const getUserRole = (state: AuthState) => state.user;
export const getLoginState = (state: AuthState) => state.signedIn;
export const getServerError = (state: AuthState) => state.serverError;

