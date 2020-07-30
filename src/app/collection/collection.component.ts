import { TopGamesService } from './services/top-games.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseAuthUser } from '../models/user.model';
import { BoardGame } from '../models/game.model';
import { Store } from '@ngrx/store';
import { MainService } from '../main/services/main.service';

import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import * as fromAuthStore from '../authentication/store';
import * as fromProfileStore from './store';

@Component({
	selector: 'app-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
	edit = false;
	showSearchBar = false;

	userId$: Observable<null | string>;
	gamesRecived$: Observable<boolean>;
	gamesRequested$: Observable<boolean>;

	userData: DatabaseAuthUser = {
		userName: '',
		uid: '',
		photoURL: '',
		email: '',
	};

	gameSearches$: Observable<BoardGame[]>;
	gameSearches: BoardGame[] = [];

	constructor(
		private authStore: Store<fromAuthStore.AuthState>,
		private profileStore: Store<fromProfileStore.ProfileSt>,
		private mainService: MainService,
		private profileService: TopGamesService,
	) {}

	ngOnInit() {
		this.userId$ = this.authStore.select(fromAuthStore.getUserRole).pipe(
			map((data: DatabaseAuthUser) => {
				if (data) {
					this.userData = data;
					return data.uid;
				}
				return null;
			}),
		);

		this.userId$.subscribe((id: null | string) => {
			if (id) {
				this.profileStore.dispatch(
					new fromProfileStore.GetUserGamesCollectionInfo(id),
				);
				this.profileStore.dispatch(
					new fromProfileStore.GetUserGames(id),
				);
			}
		});

		this.gamesRequested$ = this.profileStore.select(
			fromProfileStore.getGamesRequestedSelector,
		);
		this.gamesRecived$ = this.profileStore.select(
			fromProfileStore.getGamesRecivedSelector,
		);

		// this.Favorites$.subscribe((games) => {
		// 	if (!!games) {
		// 		this.profileStore.dispatch(
		// 			new fromProfileStore.GetFavoriteGamesSuccess(games),
		// 		);
		// 	}
		// });

		this.gameSearches$ = this.profileStore.select(
			fromProfileStore.getSearchResultsSelector,
		);
	}

	onSearch(form: NgForm) {
		this.profileStore.dispatch(
			new fromProfileStore.FindGame(form.value.searchText),
		);
	}

	onSubmit(form: NgForm) {
		const formData = {
			displayName: form.value.name,
			photoURL: form.value.photoURL,
		};

		const { displayName, photoURL } = formData;
		this.mainService.changeUserData(displayName || '', photoURL || '');
	}

	editPersonalDataToggle() {
		this.edit = !this.edit;
	}

	toggleSearch() {
		this.showSearchBar = !this.showSearchBar;
	}
}