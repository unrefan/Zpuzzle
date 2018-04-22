import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import {Auth0Service} from '../services/auth0.service';
import {NotifyService} from '../services/notify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth0Service, private router: Router, private notify: NotifyService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('access denied');
          this.notify.update('You must be logged in!', 'error');
          this.router.navigate(['/home']);
        }
      }),
    );
  }
}
