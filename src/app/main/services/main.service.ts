import { UserComment } from 'src/app/models/comment.model';
import { GameEvent } from './../../models/game-event.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
	DocumentChangeAction,
} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user.model';

@Injectable()
export class MainService {
	bggURL = 'https://www.boardgamegeek.com/xmlapi2/';
	private eventsCollection: AngularFirestoreCollection<GameEvent>;

	constructor(
		public http: HttpClient,
		public afs: AngularFirestore,
		public auth: AngularFireAuth,
	) {
		this.eventsCollection = afs.collection<GameEvent>('events');
	}

	getAllEvents(): Observable<DocumentChangeAction<GameEvent>[]> {
		return this.eventsCollection.snapshotChanges();
	}

	addEventToDatabase(eventD: GameEvent) {
		return this.eventsCollection.add(eventD);
	}

	editEventInDatabase(eventD: GameEvent) {
		const updateDoc = this.afs.doc<GameEvent>(`events/${eventD.eventId}`);
		return updateDoc.update(eventD);
	}

	deleteEventInDatabase(eventD: GameEvent) {
		const updateDoc = this.afs.doc<GameEvent>(`events/${eventD.eventId}`);
		return updateDoc.delete();
	}

	addCommentToDatabase(commentD: Partial<UserComment>, eventId: string) {
		const creationDate = firestore.FieldValue.serverTimestamp();
		return this.afs
			.doc<GameEvent>(`events/${eventId}`)
			.collection('comments')
			.add({ ...commentD, creationDate });
	}

	getEventComments(
		eventId: string,
	): Observable<DocumentChangeAction<UserComment>[]> {
		return this.afs
			.doc<GameEvent>(`events/${eventId}`)
			.collection<UserComment>('comments')
			.stateChanges();
	}

	removeCommentFromDatabase(eventId: string, commentId: string) {
		return this.afs
			.doc<GameEvent>(`events/${eventId}`)
			.collection('comments')
			.doc(commentId)
			.delete();
	}

	editCommentInDatabase(eventId: string, comment: UserComment) {
		return this.afs
			.doc<GameEvent>(`events/${eventId}`)
			.collection('comments')
			.doc('s')
			.update(comment);
		// doc id!
	}

	changeUserData(userName?, userAvatar?): Promise<void> {
		return this.auth.auth.currentUser.updateProfile({
			displayName: userName,
			photoURL: userAvatar,
		});
	}
}
