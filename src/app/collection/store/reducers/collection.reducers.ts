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
	scoreAddingRequested: boolean;
	scoreAddingSuccess: boolean;
	addingGameToTopRequested: boolean;
	addingGameToTopSuccess: boolean;
}

const initialState: ProfileState = {
	userCollectionInfo: {
		favorites: [],
		events: [],
		scores: {},
		uid: null,
		userName: null,
		email: null,
	},
	searchedData: [],
	searchRequested: false,
	searchRecived: false,
	games: {},
	gamesRequested: false,
	gamesRecived: false,
	scoreAddingRequested: false,
	scoreAddingSuccess: false,
	addingGameToTopRequested: false,
	addingGameToTopSuccess: false,
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
		case fromProfileActions.ADD_GAME_TO_TOP:
			return {
				...state,
				addingGameToTopRequested: true,
				addingGameToTopSuccess: false,
			};
		case fromProfileActions.ADD_GAME_TO_TOP_SUCCESS:
			return {
				...state,
				addingGameToTopRequested: false,
				addingGameToTopSuccess: true,
			};
		case fromProfileActions.ADD_GAME_TO_TOP_FAIL:
			return {
				...state,
				addingGameToTopRequested: false,
				addingGameToTopSuccess: false,
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
		case fromProfileActions.ADD_GAME_SCORE:
			return {
				...state,
				scoreAddingRequested: true,
				scoreAddingSuccess: false,
			};

		case fromProfileActions.ADD_GAME_SCORE_SUCCESS:
			return {
				...state,
				scoreAddingRequested: false,
				scoreAddingSuccess: true,
			};
		case fromProfileActions.ADD_GAME_SCORE_FAIL:
			return {
				...state,
				scoreAddingRequested: false,
				scoreAddingSuccess: false,
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
export const getSearchRequsted = (state: ProfileState): boolean =>
	state.searchRequested;
export const getSearchRecived = (state: ProfileState): boolean =>
	state.searchRecived;

export const getScoreAddingRequested = (state: ProfileState): boolean =>
	state.scoreAddingRequested;

export const getScoreAddingSuccess = (state: ProfileState): boolean =>
	state.scoreAddingSuccess;

export const getAddingGameToTopRequested = (state: ProfileState): boolean =>
	state.addingGameToTopRequested;
export const getAddingGameToTopSuccess = (state: ProfileState): boolean =>
	state.addingGameToTopSuccess;
