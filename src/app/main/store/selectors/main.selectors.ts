import { GameEvent } from 'src/app/models/game-event.model';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromMainReducers from '../reducers/main.reducers';
import * as fromRoot from '../../../store';

export const getMainModuleState = createSelector(
	fromFeature.getMainState,
	(state: fromFeature.MainState) => state.main,
);

export const getSearchResults = createSelector(
	getMainModuleState,
	fromMainReducers.getSearchResults,
);

export const getGameDaysObject = createSelector(
	getMainModuleState,
	fromMainReducers.getEvents,
);

export const getSendError = createSelector(
	getMainModuleState,
	fromMainReducers.getError,
);

export const getEventsList = createSelector(
	getMainModuleState,
	fromMainReducers.getEvents,
	(gameDays) => {
		if (gameDays && gameDays.events) {
			return Object.keys(gameDays.events).map((id) => {
				return gameDays.events && gameDays.events[id];
			});
		}
	},
);

export const getSelectedGameDayData = createSelector(
	getGameDaysObject,
	fromRoot.getRouterState,
	(events, router): GameEvent => events[router.state.params.gameDayId],
);

export const getIsLoadingSelector = createSelector(
	getMainModuleState,
	fromMainReducers.getIsLoading,
);
export const getIsLoadedSelector = createSelector(
	getMainModuleState,
	fromMainReducers.getIsLoaded,
);

export const getIsLoadingEventsSelector = createSelector(
	getMainModuleState,
	fromMainReducers.getIsLoadingEvents,
);

export const getIsEventsRecivedSelector = createSelector(
	getMainModuleState,
	fromMainReducers.getEventsRecived,
);
