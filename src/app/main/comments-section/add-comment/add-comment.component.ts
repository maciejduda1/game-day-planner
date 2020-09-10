import { Store, select } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameEvent } from 'src/app/models/game-event.model';
import { UserComment } from 'src/app/models/comment.model';
import { Observable } from 'rxjs';
import { DatabaseAuthUser } from 'src/app/models/user.model';

import * as fromRootStore from '../../../store';
import * as fromMainStore from '../../store';
import * as fromAuthStore from '../../../authentication/store';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
	user$: Observable<DatabaseAuthUser>;
	user: DatabaseAuthUser;
	eventId: string;
	@Input() answerTo = '';
	@Input() commentThatIsAnsweredId = '';
	@Output() commentModeDisabled = new EventEmitter<boolean>();

	commentText = '';

	isLoading = false;

	commentMode = false;

	eventSelectedforComment = -1;
	selectedEvent: number;
	constructor(
		private mainStore: Store<fromMainStore.MainState>,
		private authStore: Store<fromAuthStore.AuthState>,
		private rootStore: Store<fromRootStore.RouterStateUrl>,
	) {}

	ngOnInit() {
		this.rootStore
			.pipe(select(fromRootStore.getRouterState))
			.subscribe(
				(router) => (this.eventId = router.state.params.gameDayId),
			);

		this.user$ = this.authStore.select(fromAuthStore.getUserRole);
		this.user$.subscribe((userData) => {
			this.user = userData;
		});
	}

	addComment() {
		const commentObject: Partial<UserComment> = {
			comment: `${this.commentText}`,
			creatorId: this.user.uid,
			creatorName: this.user.userName,
			creatorAvatar: this.user.photoURL,
		};
		if (this.commentThatIsAnsweredId !== '') {
			commentObject.comment = `@${this.answerTo} ${this.commentText}`;

			this.mainStore.dispatch(
				new fromMainStore.AddComment(
					commentObject,
					this.eventId,
					this.commentThatIsAnsweredId,
				),
			);
		} else {
			this.mainStore.dispatch(
				new fromMainStore.AddComment(commentObject, this.eventId),
			);
		}
		this.disableCommentMode();
	}

	disableCommentMode() {
		this.commentMode = false;
		this.commentText = '';
		this.commentModeDisabled.emit(false);
	}
}
