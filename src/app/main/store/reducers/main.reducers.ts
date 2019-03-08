import { GameEvent } from './../../../models/game-event.model';
import * as fromMainActions from '../actions/main.actions';

export interface MainState {
  searchedData: object;
  searchRequested: boolean;
  searchRecived: boolean;
  events: {};
}

const initialState: MainState = {
  searchedData: {},
  searchRequested: false,
  searchRecived: false,
  events: {},
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
    // case ( fromMainActions.ADD_EVENT_SUCCESS ):
    //   return {
    //     ...state, events: [...state.events, action.payload]
    //   };
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
    const eventWithComments = {...allEvents, [action.payload]: {...allEvents[action.payload], comments: action.response}}

    // const eventWithComments = allEvents.map(
    //   (event: GameEvent) => event.eventId === action.payload ? {...event, comments: action.response} : event
    // );

      return {
        ...state, events: eventWithComments
      };
    default:
      return state;
  }
}

export const getSearchResults = (state: MainState) => state.searchedData;
export const getEvents = (state: MainState) => state.events;
