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
    this.afAuth.auth.signOut().then( () => {
      this.router.navigate(['login']);
    });
  }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( (credential) => {
      this.notify.update('Welcome!!!', 'success');
      this.updateUser(credential.user);
    }).catch((error) => this.handleError(error) );
  }

  private updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      score: null
    };
    return userRef.set(data, {merge: true});
  }
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
}
