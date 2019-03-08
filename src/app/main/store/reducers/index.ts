import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMainReducer from './main.reducers';

export interface MainState {
  main: fromMainReducer.MainState;
}

export const reducers: ActionReducerMap<MainState> = {
  main: fromMainReducer.reducers,
};

export const getMainState = createFeatureSelector<MainState>(
  'main'
);
