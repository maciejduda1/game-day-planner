import { UserComment } from './../../../models/comment.model';
import { Action } from '@ngrx/store';
import { GameEvent } from './../../../models/game-event.model';
import { DocumentChangeAction, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MainService } from './../../services/main.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as mainActions from '../actions/main.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class MainEffects {
	constructor(
		private actions$: Actions,
		private getMainService: MainService,
		private angFirebase: AngularFireAuth,
	) {}

	@Effect()
	getEvents$: Observable<Action> = this.actions$
		.ofType(mainActions.GET_EVENTS)
		.pipe(
			switchMap((a: mainActions.GetEvents) => {
				return this.getMainService.getAllEvents();
			}),
			map((allEvents: DocumentChangeAction<GameEvent>[]) => {
				if (allEvents) {
					const eventDataChange = allEvents.map(
						(event: DocumentChangeAction<GameEvent>) => {
							return {
								...event.payload.doc.data(),
								eventId: event.payload.doc.id,
							};
						},
					);
					return new mainActions.GetEventsSuccess(eventDataChange);
				}
			}),
		);

	@Effect()
	addEvent$ = this.actions$.ofType(mainActions.ADD_EVENT).pipe(
		switchMap((action: mainActions.AddEvent) => {
			return this.getMainService
				.addEventToDatabase(action.payload)
				.then(() => new mainActions.AddEventSuccess(action.payload))
				.catch((error) =>
					of(new mainActions.AddEventFail(error.message)),
				);
		}),
	);

	@Effect()
	editEvent$ = this.actions$.ofType(mainActions.EDIT_EVENT).pipe(
		switchMap((action: mainActions.EditEvent) => {
			return this.getMainService
				.editEventInDatabase(action.payload)
				.then((res) => new mainActions.AddEventSuccess(action.payload))
				.catch((error) =>
					of(new mainActions.AddEventFail(error.message)),
				);
		}),
	);

	@Effect()
	deleteEvent$ = this.actions$.ofType(mainActions.DELETE_EVENT).pipe(
		switchMap((action: mainActions.DeleteEvent) => {
			return this.getMainService
				.deleteEventInDatabase(action.payload)
				.then((res) => new mainActions.DeleteEventSuccess())
				.catch((error) => of(new mainActions.DeleteEventFail()));
		}),
	);

	@Effect()
	addComment$ = this.actions$.ofType(mainActions.ADD_COMMENT).pipe(
		switchMap((action: mainActions.AddComment) => {
			if (action.answerId) {
				return this.getMainService
					.addCommentAnswerToDatabase(
						action.payload,
						action.eventId,
						action.answerId,
					)
					.then(() => new mainActions.AddCommentSuccess())
					.catch((error) =>
						of(new mainActions.AddCommentFail(error)),
					);
			} else {
				return this.getMainService
					.addCommentToDatabase(action.payload, action.eventId)
					.then((res) => new mainActions.AddCommentSuccess())
					.catch((error) =>
						of(new mainActions.AddCommentFail(error)),
					);
			}
		}),
	);

	// @Effect()
	// getComments$ = this.actions$.ofType(mainActions.GET_COMMENTS).pipe(
	// 	switchMap((action: mainActions.GetComments) => {
	// 		return this.getMainService.getEventComments(action.payload).pipe(
	// 			map((res) => {
	// 				let allCommentsData = {};
	// 				res.map((comment) => {
	// 					console.log('cc ', comment);
	// 					const commentData = comment.payload.doc.data();
	// 					const id = comment.payload.doc.id;
	// 					allCommentsData = {
	// 						...allCommentsData,
	// 						[id]: commentData,
	// 					};
	// 				});
	// 				return new mainActions.GetCommentsSuccess(
	// 					action.payload,
	// 					allCommentsData,
	// 				);
	// 			}),
	// 		);
	// 	}),
	// );

	@Effect()
	getCommentAnswers$ = this.actions$
		.ofType(mainActions.GET_COMMENT_ANSWERS)
		.pipe(
			switchMap((action: mainActions.GetCommentAnswers) => {
				return this.getMainService
					.getCommentAnswers(action.eventId, action.commentId)
					.then((res: QuerySnapshot<UserComment>) => {
						const answers = res.docs.map((doc) => doc.data());
						return new mainActions.GetCommentAnswersSuccess(
							answers,
							action.commentId,
						);
					})
					.catch((error) =>
						of(new mainActions.GetCommentAnswersFail()),
					);
			}),
		);
}
