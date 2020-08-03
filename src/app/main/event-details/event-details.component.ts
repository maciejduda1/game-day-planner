import { DocumentChangeAction } from '@angular/fire/firestore';
import { GameEvent } from './../../models/game-event.model';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuthStore from '../../authentication/store';
import * as fromMainStore from '../store';

import { Observable } from 'rxjs';
import { DatabaseAuthUser } from 'src/app/models/user.model';

@Component({
	selector: 'app-event-details',
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
	constructor(
		private mainService: MainService,
		private mainStore: Store<fromMainStore.MainState>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	eventsList$: Observable<GameEvent[]>;
	eventsList: GameEvent[];
	commentMode = false;
	eventSelectedforComment = -1;
	selectedEvent: number;
	userId: string;
	initialGetFinished = false;
	errorOccured = '';

	ngOnInit() {
		this.authStore
			.select(fromAuthStore.getUserRole)
			.subscribe((data: DatabaseAuthUser) => {
				this.userId = data.uid;
			});

		this.mainService.events$.subscribe(
			(events: DocumentChangeAction<GameEvent>[]) => {
				if (!!events) {
					this.initialGetFinished = true;
					const eventDataChange = events.map(
						(event: DocumentChangeAction<GameEvent>) => {
							return {
								...event.payload.doc.data(),
								eventId: event.payload.doc.id,
							};
						},
					);
					this.mainStore.dispatch(
						new fromMainStore.GetEventsSuccess(eventDataChange),
					);
					this.eventsList = eventDataChange;
				}
			},
			(er) => {
				this.initialGetFinished = true;
				this.errorOccured = er.message;
			},
		);
		this.eventsList$ = this.mainStore.select(fromMainStore.getEventsList);
		this.eventsList$.subscribe((events) => {
			this.eventsList = events;
		});
	}
}
