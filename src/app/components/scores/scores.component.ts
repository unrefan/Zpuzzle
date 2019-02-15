import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs/Observable';
import {ScoreService} from '../../services/score.service';
import {Score} from '../../entity/score';

@Component({
  selector: 'scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit, AfterViewInit {
  scores;
  scoresObservable: Observable<Score[]>;
  sortedScores: Score[];
  score: Score[];
  constructor(private s: ScoreService) { }

  ngOnInit() {
    this.scoresObservable = this.s.getScore('/scores');
    this.s.getScore('/scores').subscribe(scores => {
      this.scores = scores.sort( (a, b) =>  a.time - b.time);
      // this.sortedScores = this.scores.sort( (a, b) =>  a.time - b.time);
    });
  }
  ngAfterViewInit(): void {
  }
}
