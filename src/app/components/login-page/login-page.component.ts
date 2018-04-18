import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';
import {User} from '../../entity/user';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user: User;
  loginGroup: FormGroup;
  constructor(private auth: Auth0Service,
              private router: Router,
              private fb: FormBuilder,
              private notify: NotifyService) { }

  ngOnInit() {
    this.auth.user.subscribe( user => this.user = user);
    this.loginGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginWithGoogle() {
    this.auth.loginGoogle();
  }
  login(): void {
    if (this.loginGroup.status === 'INVALID') {
      this.notify.update('Please enter correct data', 'error');
    } else {
      const email = this.loginGroup.value['email'];
      const password = this.loginGroup.value['password'];
      this.auth.emailLogin(email, password);
    }
  }
  logout() {
    this.auth.logout();
  }
}
