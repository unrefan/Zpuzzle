import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent implements OnInit {

  constructor(public notify: NotifyService) { }

  ngOnInit() {
  }

}
