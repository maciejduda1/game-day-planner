import { BoardGame } from './../../models/game.model';
import { SearchApiService } from './../../services/searchApi.service';
import { DatabaseAuthUser } from './../../models/user.model';
import { GameEvent } from './../../models/game-event.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventsCalendarComponent } from '../events-calendar/events-calendar.component';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as fromMainStore from '../store';
import * as fromAuthStore from '../../authentication/store';
import { Observable, Subscription } from 'rxjs';

class AddEventForm {
	date: moment.Moment;
	name: string;
	time: string;
	gamesProposed: string[];
}

@Component({
	selector: 'app-event-modal',
	templateUrl: './event-modal.component.html',
	styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit, OnDestroy {
	isSubmitting = false;
	isLoading$: Observable<boolean>;
	isLoaded$: Observable<boolean>;
	private isLoadedSubscription: Subscription;

	model: AddEventForm = {
		date: moment(),
		name: '',
		time: '',
		gamesProposed: [],
	};
	minDate = moment();
	gamesProposed: BoardGame[] = [];
	user$: Observable<DatabaseAuthUser>;
	user: DatabaseAuthUser;
	editMode = false;
	dataSendingError = '';

	addGamesSwitch = false;

	searchResults$: Observable<BoardGame[]>;

	constructor(
		public dialogRef: MatDialogRef<EventsCalendarComponent>,
		public mainStore: Store<fromMainStore.MainState>,
		public authStore: Store<fromAuthStore.AuthState>,
		private apiService: SearchApiService,
		@Inject(MAT_DIALOG_DATA) public data?: GameEvent,
	) {}

	ngOnInit() {
		this.mainStore
			.select(fromMainStore.getSendError)
			.subscribe((data) => (this.dataSendingError = data));
		if (this.data) {
			this.editMode = !this.editMode;
			console.log(this.data);
			this.model = {
				date: moment(this.data.date, 'DD-MM-YY'),
				name: this.data.name,
				time: this.data.time,
				gamesProposed: this.data.games,
			};
		}
		this.authStore
			.select(fromAuthStore.getUserRole)
			.subscribe((role) => (this.user = role));

		this.isLoading$ = this.mainStore.select(
			fromMainStore.getIsLoadingSelector,
		);
		this.isLoaded$ = this.mainStore.select(
			fromMainStore.getIsLoadedSelector,
		);
		this.isLoadedSubscription = this.isLoaded$.subscribe(
			(isLoaded: boolean) =>
				this.isSubmitting && isLoaded && this.onNoClick(),
		);
	}

	adGame(game: BoardGame): void {
		this.gamesProposed.push(game);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	addOption() {
		// this.gamesProposed = [
		// 	...this.gamesProposed,
		// 	`${this.gamesProposed.length}`,
		// ];
	}

	Search(searchedGameName: string) {
		this.searchResults$ = this.apiService.searchBggDatabase(
			searchedGameName,
		);
	}

	onSubmit(form: NgForm) {
		let gameEvent: GameEvent = {
			time: form.value.time,
			name: form.value.name,
			date: form.value.date
				? form.value.date.format('DD-MM-YY')
				: this.data.date,
			creator: this.user.userName,
			creatorUid: this.user.uid,
		};
		if (this.addGamesSwitch || this.editMode) {
			const gamesIds = this.gamesProposed.map(
				(game: BoardGame) => game.id,
			);
			gameEvent = { ...gameEvent, games: gamesIds };
		}
		this.editMode
			? this.mainStore.dispatch(
					new fromMainStore.EditEvent({
						...gameEvent,
						eventId: this.data.eventId,
					}),
			  )
			: this.mainStore.dispatch(new fromMainStore.AddEvent(gameEvent));
		this.isSubmitting = true;
	}
	ngOnDestroy() {
		this.isLoadedSubscription.unsubscribe();
	}
}
