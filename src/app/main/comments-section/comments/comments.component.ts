import { UserComment } from './../../../models/comment.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromMainStore from '../../store';
import * as fromRoot from '../../../store';
import { Store, select } from '@ngrx/store';
import { MainService } from '../../services/main.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
	commentsSub: Subscription;
	commentsArray: UserComment[] = [];

	eventId: string;
	establishedCommentsConnection = false;

	constructor(
		private mainStore: Store<fromMainStore.MainState>,
		private mainService: MainService,
		private rootStore: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		this.rootStore
			.pipe(select(fromRoot.getRouterState))
			.subscribe(
				(router) => (this.eventId = router.state.params.gameDayId),
			);

		this.commentsSub = this.mainService
			.getEventComments(this.eventId)
			.subscribe(
				(res) => {
					if (!this.establishedCommentsConnection) {
						this.establishedCommentsConnection = true;
					}
					this.commentsArray = [];
					let allCommentsData = {};
					res.map((comment) => {
						const commentData = comment.payload.doc.data();
						const id = comment.payload.doc.id;
						this.commentsArray.push({
							...commentData,
							commentId: id,
						});
						allCommentsData = {
							...allCommentsData,
							[id]: commentData,
						};
					});
					return this.mainStore.dispatch(
						new fromMainStore.GetCommentsSuccess(
							this.eventId,
							allCommentsData,
						),
					);
				},
				(er) => console.log('err ', er),
			);
	}

	ngOnDestroy() {
		this.commentsSub.unsubscribe();
	}
}
