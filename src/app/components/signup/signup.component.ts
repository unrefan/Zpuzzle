import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from '../../services/notify.service';
import {Auth0Service} from '../../services/auth0.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isVisible1 = false;
  isVisible2 = false;
  visibleClass = ['visibility_off', 'visibility'];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  userNameFormControl  = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);
  confPassFormControl  = new FormControl('', [
    Validators.required,
  ]);
  constructor(private fb: FormBuilder,
              private notify: NotifyService,
              private auth: Auth0Service) { }

  ngOnInit() {
  }
  signup() {
    const email = this.emailFormControl.value;
    const password = this.passFormControl.value;
    const username = this.userNameFormControl.value;
    console.log(email, password, username);
    this.auth.emailSignUp(email, password, username);
  }
}
