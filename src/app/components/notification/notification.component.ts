import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/animations';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]

})
export class NotificationComponent implements OnInit {

  constructor(public notify: NotifyService) { }

  ngOnInit() {
  }

}
