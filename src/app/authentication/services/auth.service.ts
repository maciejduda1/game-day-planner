import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;
  users: Observable<User[]>;

  constructor(
    public angFireAuth: AngularFireAuth,
    public angFireStore: AngularFirestore) {
      this.userCollection = angFireStore.collection<User>('users');
      this.users = this.userCollection.valueChanges();
    }

  registerUser(email, password) {
    return this.angFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email, password) {
    return this.angFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    console.log('auth sevice');
    return this.angFireAuth.auth.signOut();
  }

  addUserDataToDatabase(user: User) {
    this.userCollection.doc(user.uid).set(user);
  }

  getUserDatabaseData(uid: string) {
    this.userDocument = this.angFireStore.doc<User>(`users/${uid}`);
    return this.userDocument.valueChanges();
  }

}
