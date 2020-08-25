import { UserComment } from './../../../models/comment.model';
import { Component, OnInit, Input } from '@angular/core';

import * as fromMainStore from '../../store';
import * as fromRoot from '../../../store';
import { Store, select } from '@ngrx/store';
import { MainService } from '../../services/main.service';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
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

		this.mainService.getEventComments(this.eventId).subscribe(
			(res) => {
				if (!this.establishedCommentsConnection) {
					this.establishedCommentsConnection = true;
				}
				let allCommentsData = {};
				res.map((comment) => {
					const commentData = comment.payload.doc.data();
					this.commentsArray.push(commentData);
					const id = comment.payload.doc.id;
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
}
