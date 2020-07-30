import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProfileReducer from './collection.reducers';

export interface ProfileSt {
	search: fromProfileReducer.ProfileState;
}

export const reducers: ActionReducerMap<ProfileSt> = {
	search: fromProfileReducer.reducer,
};

export const getProfileStateSelector = createFeatureSelector<ProfileSt>(
	'collection',
);
