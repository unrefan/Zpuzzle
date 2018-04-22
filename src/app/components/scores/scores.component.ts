import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ScoreService} from '../../services/score.service';
import {Score} from '../../entity/score';

@Component({
  selector: 'scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  scores: Score[];
  sortedScores: Score[];
  constructor(private s: ScoreService) { }

  ngOnInit() {
    this.s.getScore('/scores').subscribe(scores => { this.scores = scores; });
  }
}
