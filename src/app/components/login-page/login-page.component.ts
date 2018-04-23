import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isVisible = false;
  visibleClass = ['visibility_off', 'visibility'];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(private auth: Auth0Service,
              private router: Router) { }

  ngOnInit() {
  }
  loginWithGoogle() {
    this.auth.loginGoogle();
  }
  login(): void {
      const email = this.emailFormControl.value;
      const password = this.passFormControl.value;
      this.auth.emailLogin(email, password);
  }
}
