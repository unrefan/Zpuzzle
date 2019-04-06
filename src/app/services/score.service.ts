import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs/Observable';
import {Score} from '../entity/score';

@Injectable()
export class ScoreService {

  constructor(private db: AngularFireDatabase) { }

  getScore(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }
  pushScore(path: string, score: Score ): void {
    this.db.list(path).push(score);
  }
}
