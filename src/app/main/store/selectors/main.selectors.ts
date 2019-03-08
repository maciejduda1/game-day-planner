import { GameEvent } from 'src/app/models/game-event.model';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromMainReducers from '../reducers/main.reducers';
import * as fromRoot from '../../../store';

export const getMainModuleState = createSelector(
  fromFeature.getMainState,
  (state: fromFeature.MainState) => state.main
);

export const getSearchResults = createSelector(
  getMainModuleState,
  fromMainReducers.getSearchResults
);

export const getGameDaysObject = createSelector(
  getMainModuleState,
  fromMainReducers.getEvents
);

export const getEventsList = createSelector(
  getMainModuleState,
  fromMainReducers.getEvents,
  (gameDays) => Object.keys(gameDays.events).map(
    id => {
      // gameDays.events && gameDays[id] ? gameDays[id] :
      // console.log('data storowa22 :', gameDays);
      return gameDays.events && gameDays.events[id];
    }
  )
);

export const getSelectedGameDayData = createSelector(
  getGameDaysObject,
  fromRoot.getRouterState,
  ( events, router): GameEvent => events[router.state.params.gameDayId]
);
