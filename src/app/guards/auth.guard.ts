import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Auth0Service} from '../services/auth0.service';
import {NotifyService} from '../services/notify.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth0Service, private router: Router, private notify: NotifyService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.afAuth.authState
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            this.notify.update('this action is unauthorized!', 'error');
            this.router.navigate(['/']);
          }
        });
  }
}
