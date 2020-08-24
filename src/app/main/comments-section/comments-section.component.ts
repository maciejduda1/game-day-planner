import { DatabaseAuthUser } from './../../models/user.model';
import { UserComment } from 'src/app/models/comment.model';
import { MainService } from './../services/main.service';
import { GameEvent } from 'src/app/models/game-event.model';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromMainStore from '../store';
import * as fromRoot from '../../store';
import * as fromAuthStore from '../../authentication/store';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-comments-section',
	templateUrl: './comments-section.component.html',
	styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent implements OnInit {
	gameEvent: GameEvent = new GameEvent();
	commentsList: object;
	commentsArray: UserComment[];
	eventList: object;
	// eventSelected: GameEvent;
	eventId: string;
	commentMode = false;
	eventSelectedforComment = -1;
	selectedEvent: number;

	constructor(
		private mainStore: Store<fromMainStore.MainState>,
		private rootStore: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		this.rootStore
			.select(fromRoot.getRouterState)
			.subscribe(
				(router) => (this.eventId = router.state.params.gameDayId),
			);

		this.mainStore
			.select(fromMainStore.getSelectedGameDayData)
			.subscribe((gameData: GameEvent) => {
				this.gameEvent = gameData;
			});

		// this.mainStore
		// 	.select(fromMainStore.getSelectedGameDayData)
		// 	.subscribe((gameData: GameEvent) => {
		// 		this.gameEvent = gameData;
		// 		if (gameData && gameData.comments !== undefined) {
		// 			this.commentsArray = Object.keys(gameData.comments)
		// 				.map((key) => gameData.comments[key])
		// 				.sort((a, b) => {
		// 					if (!!a.creationDate && !!b.creationDate) {
		// 						return (
		// 							a.creationDate.seconds -
		// 							b.creationDate.seconds
		// 						);
		// 					} else {
		// 						return -1000000;
		// 					}
		// 				});
		// 		} else {
		// 			this.mainService.events$.subscribe(
		// 				(events: DocumentChangeAction<GameEvent>[]) => {
		// 					const eventDataChange = events.map(
		// 						(event: DocumentChangeAction<GameEvent>) => {
		// 							return {
		// 								...event.payload.doc.data(),
		// 								eventId: event.payload.doc.id,
		// 							};
		// 						},
		// 					);
		// 					this.mainStore.dispatch(
		// 						new fromMainStore.GetEventsSuccess(
		// 							eventDataChange,
		// 						),
		// 					);
		// 				},
		// 			);
		// 		}
		// 	});
	}
}
