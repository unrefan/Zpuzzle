import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ScoreService {

  constructor(private db: AngularFireDatabase) { }

  getScore(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }
  pushScore(path: string, score: { name: string, time: string} ): void {
    this.db.list(path).push(score);
  }
}
