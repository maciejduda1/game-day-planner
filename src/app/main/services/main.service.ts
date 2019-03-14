import { UserComment } from 'src/app/models/comment.model';
import { GameEvent } from './../../models/game-event.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';
import { auth, firestore } from 'firebase/app';
import * as moment from 'moment';
import { Observable } from 'rxjs';


@Injectable()
export class MainService {
public events$: Observable<DocumentChangeAction<GameEvent>[]>;
  bggURL = 'https://www.boardgamegeek.com/xmlapi2/';
  private eventsCollection: AngularFirestoreCollection<GameEvent>;
  private eventDoc: AngularFirestoreDocument<GameEvent>;

  constructor (
    public http: HttpClient,
    public afs: AngularFirestore
    ) {
    this.eventsCollection = afs.collection<GameEvent>('events');
    this.events$ = this.eventsCollection.snapshotChanges();
  }

  searchBggDatabase(title: string) {
    return this.http.get(`${this.bggURL}search`, {
      params: new HttpParams().set('query', title).set('exact', '5').set('type', 'boardgame')
    });
  }

  addEventToDatabase(eventD: GameEvent) {
    // console.log('ap ', eventD);
    return this.eventsCollection.add(eventD);
  }

  editEventInDatabase(eventD: GameEvent) {
    // console.log('edycja ', eventD);
    const updateDoc = this.afs.doc<GameEvent>(`events/${eventD.eventId}`);
    return updateDoc.update(eventD);
  }

  deleteEventInDatabase(eventD: GameEvent) {
    // console.log('edycja ', eventD);
    const updateDoc = this.afs.doc<GameEvent>(`events/${eventD.eventId}`);
    return updateDoc.delete();
  }

  addCommentToDatabase(commentD: UserComment) {
    const creationDate = firestore.FieldValue.serverTimestamp();
    return this.afs.doc<GameEvent>(`events/${commentD.eventId}`).collection('comments').add({...commentD, creationDate });
  }

  getEventComments(eventId: string) {
    return this.afs.doc<GameEvent>(`events/${eventId}`).collection('comments').snapshotChanges();
  }

  removeCommentFromDatabase(eventId: string, commentId: string) {
    return this.afs.doc<GameEvent>(`events/${eventId}`).collection('comments').doc(commentId).delete();
  }

  editCommentInDatabase(eventId: string, comment: UserComment) {
    return this.afs.doc<GameEvent>(`events/${eventId}`).collection('comments').doc(comment.id).update(comment);
  }

}
