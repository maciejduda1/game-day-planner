import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducer';
import * as fromAuthReducer from '../reducer/auth.reducer';

export const getAuthModuleState = createSelector(
	fromFeature.getAuthState,
	(state: fromFeature.AuthState) => state.auth,
);

export const getUserRole = createSelector(
	getAuthModuleState,
	fromAuthReducer.getUserRole,
);

export const getServerError = createSelector(
	getAuthModuleState,
	fromAuthReducer.getServerError,
);

export const getLoginState = createSelector(
	getAuthModuleState,
	fromAuthReducer.getLoginState,
);
export const getUserUidSelector = createSelector(
	getAuthModuleState,
	fromAuthReducer.getUserUid,
);

export const getIsLoadingSelector = createSelector(
	getAuthModuleState,
	fromAuthReducer.getIsLoading,
);
