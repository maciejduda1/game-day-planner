import { BoardGame } from 'src/app/models/game.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { MatSelect } from '@angular/material';

import * as fromProfileStore from '../store';
import * as fromAuthStore from '../../authentication/store';

@Component({
	selector: 'app-score-select',
	templateUrl: './score-select.component.html',
	styleUrls: ['./score-select.component.scss'],
})
export class ScoreSelectComponent implements OnInit {
	@Input() game: BoardGame;
	score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	uid: string;

	constructor(
		private profileStore: Store<fromProfileStore.ProfileSt>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.authStore
			.select(fromAuthStore.getUserUidSelector)
			.subscribe((data) => (this.uid = data));
	}

	onSelect(e: MatSelect): void {
		const selectedValue: number = e.value;

		this.profileStore.dispatch(
			new fromProfileStore.AddGameScore(
				this.game,
				selectedValue,
				this.uid,
			),
		);
	}
}