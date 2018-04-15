import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';
import {User} from '../../entity/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user: User;
  constructor(private auth: Auth0Service,
              private router: Router) { }

  ngOnInit() {
    this.auth.user.subscribe( user => this.user = user);
  }
  loginWithGoogle() {
    this.auth.loginGoogle();
  }
  logout() {
    this.auth.logout();
  }
}
