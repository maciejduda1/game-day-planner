import { DocumentChangeAction } from '@angular/fire/firestore';
import { GameEvent } from './../../models/game-event.model';
import { MainService } from './../services/main.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { EventModalComponent } from '../event-modal/event-modal.component';

import * as fromAuthStore from '../../authentication/store';
import * as fromMainStore from '../store';
import * as fromRouterStore from '../../store';

import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserComment } from 'src/app/models/comment.model';
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
		private routerStore: Store<fromRouterStore.RouterStateUrl>,
		public dialog: MatDialog,
	) {}

	eventsList$: Observable<GameEvent[]>;
	eventsList: GameEvent[];
	commentMode = false;
	eventSelectedforComment = -1;
	selectedEvent: number;
	userId: string;
	initialGetFinished = false;
	errorOccured = '';

	@Output() elemHovered: EventEmitter<any> = new EventEmitter<any>();
	onHoverEnter(e): void {
		this.elemHovered.emit([`The button was entered!`, e.target.id]);
	}

	onHoverLeave(e): void {
		this.elemHovered.emit([`The button was left!`, e.target.id]);
	}

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

	deleteEvent(event: GameEvent) {
		if (confirm('Czy chcesz usunąć wydarzenie ' + event.name + '?')) {
			this.mainStore.dispatch(new fromMainStore.DeleteEvent(event));
		}
	}

	goEvent(event: GameEvent) {
		this.routerStore.dispatch(
			new fromRouterStore.Go({ path: ['main', 'event', event.eventId] }),
		);
	}

	toggleComment(eventNumber: number) {
		if (eventNumber >= 0) {
			if (eventNumber === this.eventSelectedforComment) {
				this.commentMode = false;
				this.eventSelectedforComment = -1;
			} else {
				this.commentMode = true;
				this.eventSelectedforComment = eventNumber;
			}
		} else if (eventNumber < 0) {
			this.eventSelectedforComment = -1;
			this.commentMode = !this.commentMode;
		}
	}

	editEvent(event: GameEvent) {
		const dialogRef = this.dialog.open(EventModalComponent, {
			minWidth: '50%',
			data: event,
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}
}
