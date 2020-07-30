import { GameEvent } from './../../../models/game-event.model';
import * as fromMainActions from '../actions/main.actions';

export interface MainState {
	searchedData: object;
	isLoading: boolean;
	isLoaded: boolean;
	events: {};
	errorSend: string;
}

const initialState: MainState = {
	searchedData: {},
	isLoading: false,
	isLoaded: false,
	events: {},
	errorSend: '',
};

export function reducers(
	state = initialState,
	action: fromMainActions.MainActions,
) {
	switch (action.type) {
		case fromMainActions.ADD_EVENT_FAIL:
			return {
				...state,
				errorSend: action.payload,
				isLoading: false,
				isLoaded: false,
			};

		case fromMainActions.ADD_EVENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
			};

		case fromMainActions.GET_EVENTS_SUCCESS:
			let eventsEntities: GameEvent;
			action.payload.map(
				(event): GameEvent =>
					(eventsEntities = {
						...eventsEntities,
						[event.eventId]: event,
					}),
			);
			return {
				...state,
				events: eventsEntities,
			};
		case fromMainActions.GET_COMMENTS_SUCCESS:
			const allEvents = state.events;
			const eventWithComments = {
				...allEvents,
				[action.payload]: {
					...allEvents[action.payload],
					comments: action.response,
				},
			};
			return {
				...state,
				events: eventWithComments,
			};
		case fromMainActions.ADD_EVENT:
		case fromMainActions.EDIT_EVENT:
			return {
				...state,
				isLoading: true,
				isLoaded: false,
				errorSend: null,
			};
		default:
			return state;
	}
}

export const getSearchResults = (state: MainState) => state.searchedData;
export const getEvents = (state: MainState) => state.events;
export const getError = (state: MainState) => state.errorSend;
export const getIsLoading = (state: MainState) => state.isLoading;
export const getIsLoaded = (state: MainState) => state.isLoaded;
