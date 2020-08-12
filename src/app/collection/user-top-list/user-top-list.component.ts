import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BoardGame } from './../../models/game.model';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as fromProfileStore from '../store';
import * as fromAuthStore from '../../authentication/store';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
	selector: 'app-user-top-list',
	templateUrl: './user-top-list.component.html',
	styleUrls: ['./user-top-list.component.scss'],
})
export class UserTopListComponent implements OnInit {
	editGameId: string;
	oldScore: any;
	editdisabled: boolean;

	scoreAdding$: Observable<boolean>;
	scoreAdding: boolean;

	uid: string;

	selectedScore: number;

	displayedColumns: string[] = [
		'position',
		'name',
		'image',
		'authors',
		'score',
		'actions',
	];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	@ViewChild(MatSort) sort: MatSort;

	favorites$: Observable<BoardGame[]>;

	constructor(
		private profileStore: Store<fromProfileStore.ProfileSt>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.dataSource.sort = this.sort;

		this.favorites$ = this.profileStore.pipe(
			select(fromProfileStore.getFavoritesSelector),
		);

		this.authStore
			.select(fromAuthStore.getUserUidSelector)
			.subscribe((uid: string) => (this.uid = uid));

		this.scoreAdding$ = this.profileStore.select(
			fromProfileStore.getScoreAddingRequestedSelector,
		);
		this.scoreAdding$.subscribe(
			(isLoading: boolean) => (this.scoreAdding = isLoading),
		);
	}

	scoreSelected(score: number) {
		this.selectedScore = score;
	}

	checkNaN(): boolean {
		return isNaN(this.selectedScore);
	}
	submitScore(game: BoardGame) {
		this.profileStore.dispatch(
			new fromProfileStore.AddGameScore(
				game,
				this.selectedScore,
				this.uid,
			),
		);
	}

	toggleEditMode(gameId: string) {
		if (this.editGameId === gameId) {
			this.editdisabled = false;
			this.selectedScore = NaN;
			return (this.editGameId = '');
		}
		this.editdisabled = true;
		return (this.editGameId = gameId);
	}
}
