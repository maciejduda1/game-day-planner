import { User } from 'src/app/models/user.model';
import { BoardGame } from '../../../models/game.model';
import * as fromProfileActions from '../actions/profile.actions';

export interface ProfileState {
	userCollectionInfo: User;
	searchedData: BoardGame[];
	searchRequested: boolean;
	searchRecived: boolean;
	games: { [game_id: string]: BoardGame };
	gamesRequested: boolean;
	gamesRecived: boolean;
}

const initialState: ProfileState = {
	userCollectionInfo: {
		favorites: [],
		events: [],
		userId: '',
		scores: {},
	},
	searchedData: [],
	searchRequested: false,
	searchRecived: false,
	games: {},
	gamesRequested: false,
	gamesRecived: false,
};

export function reducer(
	state = initialState,
	action: fromProfileActions.ProfileActions,
): ProfileState {
	switch (action.type) {
		case fromProfileActions.FIND_GAME:
			return {
				...state,
				searchRequested: true,
				searchRecived: false,
			};
		case fromProfileActions.FIND_GAME_SUCCESS:
			return {
				...state,
				searchRequested: false,
				searchRecived: true,
				searchedData: action.payload,
			};
		case fromProfileActions.FIND_GAME_FAIL:
			return {
				...state,
				searchRequested: false,
				searchRecived: false,
			};
		case fromProfileActions.GET_USER_GAMES_COLLECTION_INFO_SUCCESS:
			return {
				...state,
				userCollectionInfo: action.payload,
			};
		case fromProfileActions.GET_USER_GAMES:
			return {
				...state,
				gamesRecived: false,
				gamesRequested: true,
			};
		case fromProfileActions.GET_USER_GAMES_SUCCESS:
			return {
				...state,
				games: action.payload,
				gamesRecived: true,
				gamesRequested: false,
			};
		case fromProfileActions.GET_USER_GAMES_FAIL:
			return {
				...state,
				gamesRecived: false,
				gamesRequested: false,
			};

		default:
			return state;
	}
}

export const getSearchResults = (state: ProfileState): BoardGame[] =>
	state.searchedData;
export const getUserFavoritesInfo = (state: ProfileState): string[] =>
	state.userCollectionInfo.favorites;
export const getUserScoresInfo = (
	state: ProfileState,
): { [gameId: string]: number } => state.userCollectionInfo.scores;
export const getUserGames = (
	state: ProfileState,
): { [game_id: string]: BoardGame } => state.games;

export const getGamesRecived = (state: ProfileState): boolean =>
	state.gamesRecived;
export const getGamesRequested = (state: ProfileState): boolean =>
	state.gamesRequested;