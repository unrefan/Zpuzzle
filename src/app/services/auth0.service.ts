import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import {NotifyService} from './notify.service';
import {User} from '../entity/user';

@Injectable()
export class Auth0Service {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private notify: NotifyService,
              private router: Router) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( (credential) => {
      this.notify.update('Welcome!!!', 'success');
      this.updateUser(credential.user);
      this.router.navigate(['game']);
    }).catch((error) => this.handleError(error) );
  }

  emailSignUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['game']);
        this.notify.update('Welcome!!!', 'success');
        return this.updateUserWithData(user, displayName); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['game']);
        this.notify.update('Welcome!!!', 'success');
        return this.updateUser(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }
  private updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName
    };
    return userRef.set(data, {merge: true});
  }
  private updateUserWithData(user, username) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: username
    };
    return userRef.set(data, {merge: true});
  }
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
}
