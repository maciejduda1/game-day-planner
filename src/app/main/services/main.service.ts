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

	addCommentToDatabase(commentD: UserComment) {
		const creationDate = firestore.FieldValue.serverTimestamp();
		return this.afs
			.doc<GameEvent>(`events/${commentD.eventId}`)
			.collection('comments')
			.add({ ...commentD, creationDate });
	}

	getEventComments(eventId: string) {
		return this.afs
			.doc<GameEvent>(`events/${eventId}`)
			.collection('comments')
			.snapshotChanges();
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
			.doc(comment.id)
			.update(comment);
	}

	changeUserData(userName?, userAvatar?): Promise<void> {
		return this.auth.auth.currentUser.updateProfile({
			displayName: userName,
			photoURL: userAvatar,
		});
	}
}
