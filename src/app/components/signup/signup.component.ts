import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from '../../services/notify.service';
import {Auth0Service} from '../../services/auth0.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isVisible1 = false;
  isVisible2 = false;
  visibleClass = ['visibility_off', 'visibility'];
  signupGroup: FormGroup;
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
    this.signupGroup = this.fb.group({
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      confirm_password: ['', Validators.required]
    });
  }
  signup() {
    if (this.signupGroup.status === 'INVALID') {
      this.notify.update('Please enter correct data', 'error');
    } else {
      const email = this.emailFormControl.value;
      const password = this.passFormControl.value;
      const username = this.userNameFormControl.value;
      this.auth.emailSignUp(email, password, username);
    }
  }
}
