import { GameEvent } from './../../models/game-event.model';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromMainStore from '../store';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-event-details',
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
	constructor(private mainStore: Store<fromMainStore.MainState>) {}

	eventsList$: Observable<GameEvent[]>;

	loadingEvents$: Observable<boolean>;
	recivedEvents$: Observable<boolean>;
	loadingEvents = false;
	recivedEvents = false;

	ngOnInit() {
		this.loadingEvents$ = this.mainStore.pipe(
			select(fromMainStore.getIsLoadingEventsSelector),
		);
		this.loadingEvents$.subscribe(
			(isLoading) => (this.loadingEvents = isLoading),
		);

		this.recivedEvents$ = this.mainStore.pipe(
			select(fromMainStore.getIsEventsRecivedSelector),
		);

		this.recivedEvents$.subscribe(
			(recived) => (this.recivedEvents = recived),
		);

		this.eventsList$ = this.mainStore.pipe(
			select(fromMainStore.getEventsList),
		);
	}
}
