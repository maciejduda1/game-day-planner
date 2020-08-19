import { GameEvent } from './../../../models/game-event.model';
import { Action } from '@ngrx/store';

export const ADD_EVENT = '[main] add event';
export const ADD_EVENT_SUCCESS = '[main] add event success';
export const ADD_EVENT_FAIL = '[main] add event fail';

export const GET_EVENTS = '[main] get events list';
export const GET_EVENTS_SUCCESS = '[main] get events list success';
export const GET_EVENTS_FAIL = '[main] get events list fail';

export const EDIT_EVENT = '[main] edit event';

export const DELETE_EVENT = '[main] delete event';
export const DELETE_EVENT_SUCCESS = '[main] delete event success';
export const DELETE_EVENT_FAIL = '[main] delete event fail';

export const ADD_COMMENT = '[main] add comment';
export const ADD_COMMENT_SUCCESS = '[main] add comment success';
export const ADD_COMMENT_FAIL = '[main] add comment fail';

export const EDIT_COMMENT = '[main] edit comment';
export const EDIT_COMMENT_SUCCESS = '[main] edit comment success';
export const EDIT_COMMENT_FAIL = '[main] edit comment fail';

export const DELETE_COMMENT = '[main] delete comment';
export const DELETE_COMMENT_SUCCESS = '[main] delete comment success';
export const DELETE_COMMENT_FAIL = '[main] delete comment fail';

export const GET_COMMENTS = '[main] get comments';
export const GET_COMMENTS_SUCCESS = '[main] get comments success';
export const GET_COMMENTS_FAIL = '[main] get comments fail';

export class AddEvent implements Action {
	readonly type = ADD_EVENT;
	constructor(public payload: GameEvent) {}
}

export class AddEventSuccess implements Action {
	readonly type = ADD_EVENT_SUCCESS;
	constructor(public payload: GameEvent) {}
}

export class AddEventFail implements Action {
	readonly type = ADD_EVENT_FAIL;
	constructor(public payload: any) {}
}

export class GetEvents implements Action {
	readonly type = GET_EVENTS;
	constructor() {}
}

export class GetEventsSuccess implements Action {
	readonly type = GET_EVENTS_SUCCESS;
	constructor(public payload: GameEvent[]) {}
}

export class GetEventsFail implements Action {
	readonly type = GET_EVENTS_FAIL;
	constructor(public payload: any) {}
}

export class AddComment implements Action {
	readonly type = ADD_COMMENT;
	constructor(public payload: any) {}
}
export class AddCommentSuccess implements Action {
	readonly type = ADD_COMMENT_SUCCESS;
	// constructor(public payload: any) {}
}
export class AddCommentFail implements Action {
	readonly type = ADD_COMMENT_FAIL;
	constructor(public payload: any) {}
}

export class EditComment implements Action {
	readonly type = EDIT_COMMENT;
	constructor(public payload: any) {}
}
export class EditCommentSuccess implements Action {
	readonly type = EDIT_COMMENT_SUCCESS;
	constructor(public payload: any) {}
}
export class EditCommentFail implements Action {
	readonly type = EDIT_COMMENT_FAIL;
	constructor(public payload: any) {}
}

export class DeleteComment implements Action {
	readonly type = DELETE_COMMENT;
	constructor(public payload: any) {}
}
export class DeleteCommentSuccess implements Action {
	readonly type = DELETE_COMMENT_SUCCESS;
	constructor(public payload: any) {}
}
export class DeleteCommentFail implements Action {
	readonly type = DELETE_COMMENT_FAIL;
	constructor(public payload: any) {}
}

export class GetComments implements Action {
	readonly type = GET_COMMENTS;
	constructor(public payload: any) {}
}
export class GetCommentsSuccess implements Action {
	readonly type = GET_COMMENTS_SUCCESS;
	constructor(public payload: any, public response: any) {}
}
export class GetCommentsFail implements Action {
	readonly type = GET_COMMENTS_FAIL;
	constructor(public payload: any) {}
}

export class EditEvent implements Action {
	readonly type = EDIT_EVENT;
	constructor(public payload: GameEvent) {}
}

export class DeleteEvent implements Action {
	readonly type = DELETE_EVENT;
	constructor(public payload: GameEvent) {}
}
export class DeleteEventSuccess implements Action {
	readonly type = DELETE_EVENT_SUCCESS;
}
export class DeleteEventFail implements Action {
	readonly type = DELETE_EVENT_FAIL;
}

export type MainActions =
	| AddEvent
	| AddEventFail
	| AddEventSuccess
	| GetEvents
	| GetEventsFail
	| GetEventsSuccess
	| EditEvent
	| DeleteEvent
	| DeleteEventSuccess
	| DeleteEventFail
	| DeleteComment
	| DeleteCommentSuccess
	| DeleteCommentFail
	| EditComment
	| EditCommentSuccess
	| EditCommentFail
	| AddComment
	| GetComments
	| GetCommentsFail
	| GetCommentsSuccess;
