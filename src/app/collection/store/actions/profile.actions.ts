import { User } from 'src/app/models/user.model';
import { Action } from '@ngrx/store';
import { BoardGame } from 'src/app/models/game.model';

export const FIND_GAME = '[profile] find game in bgg';
export const FIND_GAME_SUCCESS = '[profile] find game in bgg success';
export const FIND_GAME_FAIL = '[profile] find game in bgg fail';

export const ADD_GAME_TO_TOP = '[profile] add game to top-list';
export const ADD_GAME_TO_TOP_SUCCESS = '[profile] add game to top-list success';
export const ADD_GAME_TO_TOP_FAIL = '[profile] add game to top-list fail';

export const ADD_GAME_SCORE = '[profile] add game score';
export const ADD_GAME_SCORE_SUCCESS = '[profile] add game score success';
export const ADD_GAME_SCORE_FAIL = '[profile] add game score fail';

export const GET_USER_GAMES_COLLECTION_INFO =
	'[profile] get user games collection info';

export const GET_USER_GAMES_COLLECTION_INFO_SUCCESS =
	'[profile] get user games collection info success';

export const GET_USER_GAMES_COLLECTION_INFO_FAIL =
	'[profile] get user games collection info fail';

export const GET_USER_GAMES = '[profile] get user games';
export const GET_USER_GAMES_SUCCESS = '[profile] get user games success';
export const GET_USER_GAMES_FAIL = '[profile] get user games fail';

export class FindGame implements Action {
	readonly type = FIND_GAME;
	constructor(public payload: any) {}
}

export class FindGameSuccess implements Action {
	readonly type = FIND_GAME_SUCCESS;
	constructor(public payload: BoardGame[]) {}
}

export class FindGameFail implements Action {
	readonly type = FIND_GAME_FAIL;
	constructor(public payload: any) {}
}

// Top GAMES Add

export class AddGameToTop implements Action {
	readonly type = ADD_GAME_TO_TOP;
	constructor(public payload: BoardGame, public userId: string) {}
}

export class AddGameToTopSuccess implements Action {
	readonly type = ADD_GAME_TO_TOP_SUCCESS;
	constructor(public payload: any) {}
}

export class AddGameToTopFail implements Action {
	readonly type = ADD_GAME_TO_TOP_FAIL;
	constructor(public payload: any) {}
}

// Rate Game

export class AddGameScore implements Action {
	readonly type = ADD_GAME_SCORE;
	constructor(
		public payload: BoardGame,
		public score: number,
		public uid: string,
	) {}
}

export class AddGameScoreSuccess implements Action {
	readonly type = ADD_GAME_SCORE_SUCCESS;
	constructor(public payload: any) {}
}

export class AddGameScoreFail implements Action {
	readonly type = ADD_GAME_SCORE_FAIL;
	constructor(public payload: any) {}
}

// USER Games collection info Get

export class GetUserGamesCollectionInfo implements Action {
	readonly type = GET_USER_GAMES_COLLECTION_INFO;
	constructor(public payload: string) {}
}

export class GetUserGamesCollectionInfoSuccess implements Action {
	readonly type = GET_USER_GAMES_COLLECTION_INFO_SUCCESS;
	constructor(public payload: User) {}
}

export class GetUserGamesCollectionInfoFail implements Action {
	readonly type = GET_USER_GAMES_COLLECTION_INFO_FAIL;
	constructor(public payload: string) {}
}

// User games

export class GetUserGames implements Action {
	readonly type = GET_USER_GAMES;
	constructor(public payload: string) {}
}

export class GetUserGamesSuccess implements Action {
	readonly type = GET_USER_GAMES_SUCCESS;
	constructor(public payload: { [game_id: string]: BoardGame }) {}
}

export class GetUserGamesFail implements Action {
	readonly type = GET_USER_GAMES_FAIL;
	constructor(public payload: string) {}
}

export type ProfileActions =
	| GetUserGames
	| GetUserGamesSuccess
	| GetUserGamesFail
	| GetUserGamesCollectionInfo
	| GetUserGamesCollectionInfoSuccess
	| GetUserGamesCollectionInfoFail
	| AddGameScore
	| AddGameScoreSuccess
	| AddGameScoreFail
	| AddGameToTop
	| AddGameToTopFail
	| AddGameToTopSuccess
	| FindGame
	| FindGameSuccess
	| FindGameFail;
