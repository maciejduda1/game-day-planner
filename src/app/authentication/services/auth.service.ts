import { DatabaseAuthUser } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { UserInfo } from 'firebase';

@Injectable()
export class AuthService {
	private userCollection: AngularFirestoreCollection<DatabaseAuthUser>;
	userDocument: AngularFirestoreDocument<DatabaseAuthUser>;

	private user: DatabaseAuthUser;
	private loginState = new Subject<DatabaseAuthUser>();

	constructor(
		public angFireAuth: AngularFireAuth,
		public angFireStore: AngularFirestore,
	) {
		this.userCollection = angFireStore.collection<DatabaseAuthUser>(
			'users',
		);
	}

	checkLoginState(): void {
		this.angFireAuth.authState.subscribe((user: UserInfo) => {
			let authUser: DatabaseAuthUser = {
				uid: '',
				userName: '',
				photoURL: '',
				email: '',
			};
			if (user) {
				authUser = {
					uid: user.uid,
					userName: user.displayName,
					photoURL: user.photoURL,
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
