import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameEvent } from 'src/app/models/game-event.model';
import { UserComment } from 'src/app/models/comment.model';
import { Observable } from 'rxjs';
import { DatabaseAuthUser } from 'src/app/models/user.model';

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
	@Input() eventId: string;

	commentText = '';

	isLoading = false;

	commentMode = false;

	eventSelectedforComment = -1;
	selectedEvent: number;
	constructor(
		private mainStore: Store<fromMainStore.MainState>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.user$ = this.authStore.select(fromAuthStore.getUserRole);
		this.user$.subscribe((userData) => {
			this.user = userData;
		});
	}

	addComment() {
		const commentObject: Partial<UserComment> = {
			comment: this.commentText,
			creatorId: this.user.uid,
		};
		this.mainStore.dispatch(
			new fromMainStore.AddComment(commentObject, this.eventId),
		);
		this.disableCommentMode();
	}

	disableCommentMode() {
		this.commentMode = false;
		this.commentText = '';
	}
}
