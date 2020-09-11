import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AddCommentComponent } from './../../add-comment/add-comment.component';
import { UserComment } from './../../../../models/comment.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import * as fromMainStore from '../../../store';
import * as fromRootStore from '../../../../store';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
	@Input() comment: UserComment = new UserComment();
	@ViewChild(AddCommentComponent) addComment: AddCommentComponent;

	replyIndicator = false;
	eventId = '';
	commentAnswers: UserComment[] = [];

	commentAnswers$: Observable<UserComment[]>;

	answersRequested$: Observable<boolean>;
	answersRecived$: Observable<boolean>;

	answersShow = false;

	loadingAnswers = false;

	constructor(
		private mainStore: Store<fromMainStore.MainState>,
		private routerStore: Store<fromRootStore.State>,
	) {}

	ngOnInit() {
		this.routerStore
			.pipe(select(fromRootStore.getRouterState))
			.subscribe(
				(router) => (this.eventId = router.state.params.gameDayId),
			);

		this.commentAnswers$ = this.mainStore.pipe(
			select(fromMainStore.getCommentsAnswersSelector),
			map((comments: { [key: string]: UserComment[] }) => {
				const selectedComments = comments[this.comment.commentId];
				return selectedComments;
			}),
		);

		this.answersRequested$ = this.mainStore.pipe(
			select(fromMainStore.getCommentAnswersRequestedSelector),
		);

		this.answersRequested$.subscribe((status) =>
			!status ? (this.loadingAnswers = false) : null,
		);

		this.answersRecived$ = this.mainStore.pipe(
			select(fromMainStore.getCommentAnswersRecivedSelector),
		);
	}

	handleClick() {
		this.replyIndicator = !this.replyIndicator;
	}

	disableReply(e: boolean) {
		this.replyIndicator = e;
	}

	showAnswers() {
		this.answersShow = !this.answersShow;
		if (this.answersShow) {
			this.loadingAnswers = true;
			this.mainStore.dispatch(
				new fromMainStore.GetCommentAnswers(
					this.eventId,
					this.comment.commentId,
				),
			);
		}
	}
}
