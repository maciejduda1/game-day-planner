import { SearchApiService } from './../../../services/searchApi.service';
import { BoardGame } from './../../../models/game.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { TopGamesService } from './../../services/top-games.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as profileActions from '../actions/profile.actions';
import { of } from 'rxjs';

interface ApiSearchResponse {
	games: GameItem[];
}

interface GameItem {
	id: string;
	name: string;
	year_published?: number;
	min_players: number;
	max_players: number;
	min_playtime: number;
	max_playtime: number;
	min_age: number;
	description: string;
	description_preview: string;
	image_url: string;
	thumb_url: string;
	images: Images;
	url: string;
	price: string;
	msrp: string;
	discount: string;
	primary_publisher: string;
	publishers: string[];
	mechanics: any[];
	categories: any[];
	designers: string[];
	developers: any[];
	artists: string[];
	names: string[];
	num_user_ratings: number;
	average_user_rating: number;
	official_url: string;
	rules_url: string;
	weight_amount: number;
	weight_units: string;
	size_height: number;
	size_width: number;
	size_depth: number;
	size_units: string;
	matches_specs?: any;
	spec: any[];
	reddit_all_time_count: number;
	reddit_week_count: number;
	reddit_day_count: number;
	historical_low_price: number;
	historical_low_date: Date;
}

interface Images {
	thumb: string;
	small: string;
	medium: string;
	large: string;
	original: string;
}

@Injectable()
export class ProfileEffects {
	constructor(
		private actions$: Actions,
		private getTopGamesService: TopGamesService,
		private getSearchApiService: SearchApiService,
		private angFirebase: AngularFireAuth,
	) {}

	@Effect()
	searchBGG$ = this.actions$.ofType(profileActions.FIND_GAME).pipe(
		switchMap((action: profileActions.FindGame) => {
			return this.getSearchApiService
				.searchBggDatabase(action.payload)
				.pipe(
					map((res: BoardGame[]) => {
						return new profileActions.FindGameSuccess(res);
					}),
					catchError((error) =>
						of(new profileActions.FindGameFail(error)),
					),
				);
		}),
	);

	@Effect()
	addFav$ = this.actions$.pipe(
		ofType(profileActions.ADD_GAME_TO_TOP),
		// mergeMap((action: profileActions.AddGameToTop) =>
		// 	this.getTopGamesService
		// 		.addGame(action.payload, action.userId)
		// 		.then((res) => action)
		// 		.catch((err) => of(new profileActions.AddGameToTopFail(err))),
		// ),
		// mergeMap((action: profileActions.AddGameToTop) =>
		// 	this.getTopGamesService
		// 		.addGameToFavorites(action.payload.id, action.userId)
		// 		.then((res) => new profileActions.AddGameToTopSuccess(res))
		// 		.catch((err) => of(new profileActions.AddGameToTopFail(err))),
		// ),
		mergeMap((action: profileActions.AddGameToTop) =>
			this.getTopGamesService
				.addGameToFavorites(action.payload, action.userId)
				.then((res) => new profileActions.AddGameToTopSuccess(res))
				.catch((err) => of(new profileActions.AddGameToTopFail(err))),
		),
	);

	@Effect()
	score$ = this.actions$.pipe(
		ofType(profileActions.ADD_GAME_SCORE),
		mergeMap((action: profileActions.AddGameScore) => {
			return this.getTopGamesService
				.addGameScore(action.payload, action.uid, action.score)
				.then((res) => new profileActions.AddGameScoreSuccess(res))
				.catch((err) => of(new profileActions.AddGameScoreFail(err)));
		}),
	);

	@Effect()
	getCollectionInfo$ = this.actions$.pipe(
		ofType(profileActions.GET_USER_GAMES_COLLECTION_INFO),
		switchMap((action: profileActions.GetUserGamesCollectionInfo) =>
			this.getTopGamesService.getUserGamesCollection(action.payload).pipe(
				map(
					(collectionInfo) =>
						new profileActions.GetUserGamesCollectionInfoSuccess(
							collectionInfo,
						),
				),
				catchError((error) =>
					of(
						new profileActions.GetUserGamesCollectionInfoFail(
							error,
						),
					),
				),
			),
		),
	);

	@Effect()
	getUserGames$ = this.actions$.pipe(
		ofType(profileActions.GET_USER_GAMES),
		switchMap((action: profileActions.GetUserGames) =>
			this.getTopGamesService.getGamesData(action.payload).pipe(
				map((games: BoardGame[]) => {
					const gamesObject: { [game_id: string]: BoardGame } = {};
					games.map((game) => (gamesObject[game.id] = game));

					return new profileActions.GetUserGamesSuccess(gamesObject);
				}),
				catchError((error) =>
					of(new profileActions.GetUserGamesFail(error)),
				),
			),
		),
	);
}
