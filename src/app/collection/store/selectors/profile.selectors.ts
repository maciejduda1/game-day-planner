import { BoardGame } from 'src/app/models/game.model';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromProfileReducers from '../reducers/collection.reducers';

export const getProfileModuleState = createSelector(
	fromFeature.getProfileStateSelector,
	(state: fromFeature.ProfileSt): fromProfileReducers.ProfileState =>
		state.search,
);

export const getSearchResultsSelector = createSelector(
	getProfileModuleState,
	fromProfileReducers.getSearchResults,
);

const getFavSelector = createSelector(
	getProfileModuleState,
	fromProfileReducers.getUserFavoritesInfo,
);

const getGamesSelector = createSelector(
	getProfileModuleState,
	fromProfileReducers.getUserGames,
);

const getUsScores = createSelector(
	getProfileModuleState,
	fromProfileReducers.getUserScoresInfo,
);

export const getFavoritesSelector = createSelector(
	getFavSelector,
	getGamesSelector,
	(favorites, games) => {
		const favoriteGamesCollection: BoardGame[] = [];
		if (favorites) {
			favorites.map(
				(gameId: string) =>
					!!games[gameId] &&
					favoriteGamesCollection.push(games[gameId]),
			);
		}
		return favoriteGamesCollection;
	},
);

export const getUserScoredGames = createSelector(
	getUsScores,
	getGamesSelector,
	(scores, games) => {
		return games;
	},
);

export const getGamesRecivedSelector = createSelector(
	getProfileModuleState,
	fromProfileReducers.getGamesRecived,
);

export const getGamesRequestedSelector = createSelector(
	getProfileModuleState,
	fromProfileReducers.getGamesRequested,
);
