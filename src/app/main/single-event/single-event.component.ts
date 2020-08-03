import { GameEvent } from './../../models/game-event.model';
import { Component, OnInit, Input } from '@angular/core';

import { EventModalComponent } from '../event-modal/event-modal.component';

import * as fromAuthStore from '../../authentication/store';
import * as fromMainStore from '../store';
import * as fromRouterStore from '../../store';
import { MainService } from '../services/main.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { DatabaseAuthUser } from 'src/app/models/user.model';

@Component({
	selector: 'app-single-event',
	templateUrl: './single-event.component.html',
	styleUrls: ['./single-event.component.scss'],
})
export class SingleEventComponent implements OnInit {
	@Input() gameDay: GameEvent;
	constructor(
		private mainService: MainService,
		private mainStore: Store<fromMainStore.MainState>,
		private authStore: Store<fromAuthStore.AuthState>,
		private routerStore: Store<fromRouterStore.RouterStateUrl>,
		public dialog: MatDialog,
	) {}

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
