import { GameEvent } from './../../../models/game-event.model';
import * as fromMainActions from '../actions/main.actions';

export interface MainState {
  searchedData: object;
  searchRequested: boolean;
  searchRecived: boolean;
  events: {};
  errorSend: string;
}

const initialState: MainState = {
  searchedData: {},
  searchRequested: false,
  searchRecived: false,
  events: {},
  errorSend: '',
};

export function reducers(state = initialState, action: fromMainActions.MainActions ) {
  switch (action.type) {
    case ( fromMainActions.FIND_GAME ):
      return {
        ...state, searchRequested: true, searchRecived: false
      };
    case ( fromMainActions.FIND_GAME_SUCCESS ):
      return {
        ...state, searchRequested: false, searchRecived: true, searchedData: action.payload
      };
    case ( fromMainActions.FIND_GAME_FAIL ):
      return {
        ...state, searchRequested: false, searchRecived: false
      };

    case ( fromMainActions.ADD_EVENT_FAIL ):
      return {
        ...state, errorSend: action.payload
      };

    case ( fromMainActions.ADD_EVENT_SUCCESS ):
      return {
        ...state, errorSend: ''
      };

    case ( fromMainActions.GET_EVENTS_SUCCESS):
    let eventsEntities: GameEvent;
    action.payload.map(
      (event): GameEvent =>
        eventsEntities = {...eventsEntities, [event.eventId]: event}
    );
      return {
        ...state, events: eventsEntities
      };
    case ( fromMainActions.GET_COMMENTS_SUCCESS):
      const allEvents = state.events;
      const eventWithComments = {...allEvents, [action.payload]: {...allEvents[action.payload], comments: action.response}};
      return {
        ...state, events: eventWithComments
      };
    default:
      return state;
  }
}

export const getSearchResults = (state: MainState) => state.searchedData;
export const getEvents = (state: MainState) => state.events;
export const getError = (state: MainState) => state.errorSend;
