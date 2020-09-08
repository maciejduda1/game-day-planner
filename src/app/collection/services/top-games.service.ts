import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { BoardGame } from './../../models/game.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	CollectionReference,
	DocumentReference,
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

@Injectable()
export class TopGamesService {
	private gamesCollection: AngularFirestoreCollection<BoardGame>;
	private usersCollection: AngularFirestoreCollection<User>;

	constructor(public http: HttpClient, public afs: AngularFirestore) {
		this.gamesCollection = afs.collection('games');
		this.usersCollection = afs.collection('users');
	}

	getGamesData(userId: string): Observable<BoardGame[]> {
		return this.afs
			.collection<BoardGame>('games', (ref: CollectionReference) =>
				ref.where('users_connected', 'array-contains', userId),
			)
			.valueChanges();
	}

	addGameToFavorites(game: BoardGame, userId: string) {
		const batch = this.afs.firestore.batch();
		const userDocument: DocumentReference = this.usersCollection.doc<any>(
			`${userId}`,
		).ref;
		const gameRef = this.gamesCollection.doc(game.id).ref;

		batch.set(
			userDocument,
			{ favorites: firebase.firestore.FieldValue.arrayUnion(game.id) },
			{ merge: true },
		);

		batch.set(
			gameRef,
			{
				...game,
				users_connected: firebase.firestore.FieldValue.arrayUnion(
					userId,
				),
			},
			{ merge: true },
		);

		return batch.commit();
	}

	removeGameFromFavorites(gameId: string, userId: string) {
		return this.usersCollection.doc<any>(`${userId}`).set(
			{
				favorites: firebase.firestore.FieldValue.arrayRemove(gameId),
			},
			{ merge: true },
		);
	}

	addGameScore(game: BoardGame, userId: string, score: number) {
		const userDocumentRef: DocumentReference = this.usersCollection.doc<
			any
		>(`${userId}`).ref;
		const gameRef = this.gamesCollection.doc<BoardGame>(game.id).ref;

		return this.afs.firestore.runTransaction(async (transaction) => {
			const dbGame = await transaction.get(gameRef);

			if (!dbGame.exists) {
				await transaction.set(gameRef, {
					...game,
					score: score,
					user_scores: { [userId]: score },
					users_connected: [userId],
				});
			}
			if (dbGame.exists) {
				const gameData = dbGame.data();
				const updated_scores = {
					...gameData.user_scores,
					[userId]: score,
				};

				const allUserScores: number[] = Object.keys(updated_scores).map(
					(uid) => updated_scores[uid],
				);
				const sumOfScores = allUserScores.reduce((a, b) => a + b, 0);
				const newGameScore =
					+(sumOfScores / allUserScores.length).toPrecision(2) || 0;

				const updatedGameDocument = {
					...gameData,
					user_scores: updated_scores,
					score: newGameScore,
				};

				await transaction.set(gameRef, updatedGameDocument);
			}
			await transaction.set(
				userDocumentRef,
				{ scores: { [game.id]: score } },
				{ merge: true },
			);
		});
	}

	getUserGamesCollection(userId: string): Observable<User> {
		return this.afs.doc<User>(`users/${userId}`).valueChanges();
	}
}
