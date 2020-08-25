import { GameEvent } from 'src/app/models/game-event.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromMainStore from '../store';
import * as fromRoot from '../../store';

import { Subscription } from 'rxjs';

@Component({
	selector: 'app-comments-section',
	templateUrl: './comments-section.component.html',
	styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent implements OnInit, OnDestroy {
	gameEvent: GameEvent = new GameEvent();
	eventId: string;

	GameDayDataSubscription: Subscription;

	constructor(
		private mainStore: Store<fromMainStore.MainState>,
		private rootStore: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		this.rootStore
			.pipe(select(fromRoot.getRouterState))
			.subscribe(
				(router) => (this.eventId = router.state.params.gameDayId),
			);

		this.GameDayDataSubscription = this.mainStore
			.pipe(select(fromMainStore.getSelectedGameDayData))
			.subscribe((gameData: GameEvent) => {
				this.gameEvent = gameData;
			});
	}

	ngOnDestroy() {
		this.GameDayDataSubscription.unsubscribe();
	}
}
