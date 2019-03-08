import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducer';
import * as fromAuthReducer from '../reducer/auth.reducer';

export const getAuthModuleState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.auth
);

export const getUserRole = createSelector(
  getAuthModuleState,
  fromAuthReducer.getUserRole
);

export const getLoginState = createSelector(
  getAuthModuleState,
  fromAuthReducer.getLoginState
);
