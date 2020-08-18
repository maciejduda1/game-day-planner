import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameEvent } from 'src/app/models/game-event.model';
import { UserComment } from 'src/app/models/comment.model';
import { Observable } from 'rxjs';
import { DatabaseAuthUser } from 'src/app/models/user.model';

import * as fromMainStore from '../../store';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
	@Input() user: DatabaseAuthUser;
	@Input() eventId: string;

	commentText = '';

	isLoading = false;

	commentMode = false;

	eventSelectedforComment = -1;
	selectedEvent: number;
	constructor(private mainStore: Store<fromMainStore.MainState>) {}

	ngOnInit() {}

	addComment() {
		const commentObject: UserComment = {
			comment: this.commentText,
			eventId: this.eventId,
			creatorId: this.user.uid,
			creatorName: this.user.userName,
			creatorAvatar: this.user.photoURL,
		};
		this.mainStore.dispatch(new fromMainStore.AddComment(commentObject));
		this.disableCommentMode();
	}

	disableCommentMode() {
		this.commentMode = false;
		this.commentText = '';
	}
}
