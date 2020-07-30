import { Observable } from 'rxjs';
import { BoardGame } from './../../models/game.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class Top10Service {
	constructor(public http: HttpClient, public afs: AngularFirestore) {}

	getCollection(): Observable<BoardGame[]> {
		return this.afs
			.collection<BoardGame>('games', (ref) =>
				ref.where('score', '>=', 0).orderBy('score', 'desc').limit(10),
			)
			.valueChanges();
	}
}
