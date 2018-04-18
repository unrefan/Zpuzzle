import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NotifyService} from '../../services/notify.service';
import {Auth0Service} from '../../services/auth0.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupGroup: FormGroup;
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
      const email = this.signupGroup.value['email'];
      const password = this.signupGroup.value['password'];
      const username = this.signupGroup.value['username'];
      this.auth.emailSignUp(email, password, username);
    }
  }
}
