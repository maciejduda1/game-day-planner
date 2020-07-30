import { BoardGame } from 'src/app/models/game.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import * as fromProfileStore from '../store';
import * as fromAuthStore from '../../authentication/store';

@Component({
	selector: 'app-search-result-in-collection',
	templateUrl: './search-result-in-collection.component.html',
	styleUrls: ['./search-result-in-collection.component.scss'],
})
export class SearchResultInCollectionComponent implements OnInit {
	@Input() game: BoardGame;

	uid$: Observable<string>;
	uid: string;

	constructor(
		private profileStore: Store<fromProfileStore.ProfileSt>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.uid$ = this.authStore.select(fromAuthStore.getUserUidSelector);
		this.uid$.subscribe((uid) => (this.uid = uid));
	}

	onClick() {
		if (this.game && this.uid) {
			this.profileStore.dispatch(
				new fromProfileStore.AddGameToTop(this.game, this.uid),
			);
		} else {
			console.log('brak danych');
		}
	}
}
