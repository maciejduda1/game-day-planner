import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuthReducer from './auth.reducer';

export interface AuthState {
	auth: fromAuthReducer.AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
	auth: fromAuthReducer.reducers,
};

export const getAuthState = createFeatureSelector<fromAuthReducer.AuthState>(
	'auth',
);
