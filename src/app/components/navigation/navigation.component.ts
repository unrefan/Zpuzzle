import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';
import {User} from '../../entity/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: User;
  constructor(private auth: Auth0Service) { }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user);
  }
  logout() {
    this.auth.logout();
  }
}
