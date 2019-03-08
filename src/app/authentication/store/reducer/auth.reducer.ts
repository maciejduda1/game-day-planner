import { User } from './../../../models/user.model';
import * as fromAuthActions from '../actions/auth.actions';

export interface AuthState {
  signedIn: boolean;
  user: User;
}

const initialState: AuthState = {
  signedIn: false,
  user: new User,
};

export function reducers(state = initialState, action: fromAuthActions.AuthActions) {
  switch (action.type) {
    case (fromAuthActions.REGISTER_SUCCESS):
    case (fromAuthActions.LOGIN_SUCCESS):
    console.log('reducer ', action.payload);
      return {
        ...state, user: action.payload
      };

    // case (fromAuthActions.LOGOUT_SUCCESS):
    //   return {
    //     ...state, signedIn: false
    //   };

    default:
      return state;
  }
}

export const getUserRole = (state: AuthState) => state.user;
export const getLoginState = (state: AuthState) => state.signedIn;
