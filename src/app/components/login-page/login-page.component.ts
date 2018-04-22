import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';
import {User} from '../../entity/user';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isVisible = false;
  visibleClass = ['visibility_off', 'visibility'];
  user: User;
  loginGroup: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(private auth: Auth0Service,
              private router: Router,
              private fb: FormBuilder,
              private notify: NotifyService) { }

  ngOnInit() {
    this.auth.user.subscribe( user => this.user = user);
    this.loginGroup = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.min(6)]
    });
  }
  loginWithGoogle() {
    this.auth.loginGoogle();
  }
  login(): void {
    if (this.loginGroup.status === 'INVALID') {
      this.notify.update('Please enter correct data', 'error');
    } else {
      const email = this.emailFormControl.value;
      const password = this.passFormControl.value;
      this.auth.emailLogin(email, password);
    }
  }
}
