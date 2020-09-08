import { DatabaseAuthUser, User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subject, of } from 'rxjs';
import { UserInfo } from 'firebase';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
	userDocument: AngularFirestoreDocument<DatabaseAuthUser>;

	private user: DatabaseAuthUser;
	private loginState = new Subject<DatabaseAuthUser | null>();

	constructor(
		public angFireAuth: AngularFireAuth,
		public angFireStore: AngularFirestore,
	) {}

	checkLoginState(): void {
		this.angFireAuth.authState
			.pipe(
				mergeMap((res: UserInfo | null) => {
					if (res) {
						return this.getUserDatabaseData(res.uid);
					}
					return of(null);
				}),
				catchError((er) => {
					throw er.message;
				}),
			)
			.subscribe((user: User) => {
				let authUser: DatabaseAuthUser | null = null;
				if (user) {
					authUser = {
						uid: user.uid,
						userName: user.userName || '',
						photoURL: user.photoURL || '',
						email: user.email,
					};
				}
				this.user = authUser;
				this.loginState.next(this.user);
			});
	}

	registerUser(email, password) {
		return this.angFireAuth.auth.createUserWithEmailAndPassword(
			email,
			password,
		);
	}

	loginUser(email, password) {
		return this.angFireAuth.auth.signInWithEmailAndPassword(
			email,
			password,
		);
	}

	logoutUser() {
		return this.angFireAuth.auth.signOut();
	}

	addUserDataToDatabase(user: Partial<DatabaseAuthUser>) {
		return this.angFireStore
			.doc(`users/${this.user.uid}`)
			.set(user, { merge: true });
	}

	getUserDatabaseData(uid: string) {
		this.userDocument = this.angFireStore.doc<DatabaseAuthUser | null>(
			`users/${uid}`,
		);
		return this.userDocument.valueChanges();
	}

	getUser(): Observable<DatabaseAuthUser> {
		return this.loginState;
	}

	isAuthenticated(): boolean {
		return !!this.user;
	}
}
