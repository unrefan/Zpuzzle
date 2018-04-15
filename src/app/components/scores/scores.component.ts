import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ScoreService} from '../../services/score.service';

@Component({
  selector: 'scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  scores: Observable<any[]>;
  constructor(private s: ScoreService) { }

  ngOnInit() {
    this.scores = this.s.getScore('/scores');
  }
}
