import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private auth: Auth0Service) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
  }
}
