import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';

import { NotifyService } from './notify.service';
import { User } from '../entity/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Auth0Service {
  user: Observable<User>;

  constructor(
      public afAuth: AngularFireAuth,
      public router: Router,
      public notify: NotifyService
  ) {
    this.user = afAuth.user;
  }
  get authenticated(): boolean {
      return this.afAuth.authState !== null;
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( (credential) => {
      // this.router.navigate(['game']);
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
        // return this.updateUser(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    //
  }
  private updateUserWithData(user, username) {
    //
  }
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
}
