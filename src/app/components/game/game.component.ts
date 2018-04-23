import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NotifyService} from '../../services/notify.service';
import {ScoreService} from '../../services/score.service';
import {Auth0Service} from '../../services/auth0.service';
import {User} from '../../entity/user';
import {MatDialog} from '@angular/material';
import {ScoresComponent} from '../scores/scores.component';
import {Score} from '../../entity/score';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, AfterViewInit {
  puzzleSize: Array<string>;
  puzzlePosition: Array<string>;
  tileStyles: TileStyle[] = [];
  fieldSize = 3;
  node: Tile;
  dropEl;
  elem;
  items;
  timerId;
  dragable = false;
  disabled = false;
  user: User;
  firstGame = true;
  isGameStart = false;
  constructor(private notify: NotifyService,
              private sc: ScoreService,
              private auth: Auth0Service,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.puzzleSize = new Array<string>(this.fieldSize);
    this.puzzlePosition = [
      'top left', 'top', 'top right',
      'center left', 'center', 'center right',
      'bottom left', 'bottom', 'bottom right'
    ];
    this.auth.user.subscribe(user => this.user = user);
    this.createRandomPosition();
  }
  ngAfterViewInit(): void {
    this.items = document.querySelectorAll('.drop-target');
  }

  mouseDown(event) {
    if (event.which !== 1) { return; }
    const el = event.target.closest('.puzzle__piece');
    if (!el) { return; }
    this.node = new Tile(el, event.pageX, event.pageY, 'url(\'../../assets/img/kotel.jpg\')', null, null);
  }
  mouseMove(event) {
    if (!this.node) { return; }
    this.node.element.hidden = true;
    const el = document.elementFromPoint(event.clientX, event.clientY);
    this.node.element.hidden = false;
    if (!el) { return null; }
    if ( el.closest('.drop-target') ) {
      for (let item of this.items) {
        item.style.backgroundColor = '#aaa';
      }
      (el as HTMLElement).style.backgroundColor = '#eee';
      this.elem = (el as HTMLElement);
    } else {
      for (let item of this.items) {
        item.style.backgroundColor = '#aaa';
      }
    }
  }
  mouseup(event) {
    if (this.isGameStart) {
      this.dropEl = this.findDrop(event);
    }
    if (!this.dropEl) { return; }
    if (this.dropEl.id === this.node.element.id && this.isGameStart) {
      this.dropEl.style.backgroundImage = 'url(\'../../assets/img/kotel.jpg\')';
      this.dropEl.style.backgroundPosition = this.node.element.style.backgroundPosition;
      const parent = this.node.element.parentNode;
      parent.removeChild(this.node.element);
      if (parent.childNodes.length < 4) {
        const win = new Date().getSeconds();
        let score = win - this.timerId;
        if (score < 0) { score += 60; }
        const name = this.user.displayName;
        this.sc.pushScore('/scores', new Score(name, score));
        this.openScores();
        this.notify.update('You win!!! Your score is ' + score + 's', 'info');
        this.disabled = !this.disabled;
        this.isGameStart = !this.isGameStart;
      }
    }
  }
  private clearBgImage() {
    for (let item of this.items) {
      item.style.backgroundImage = '';
    }
  }
  findDrop(event) {
    this.node.element.hidden = true;
    const el = document.elementFromPoint(event.clientX, event.clientY);
    this.node.element.hidden = false;
    if (!el) { return null; }
    return el.closest('.drop-target');
  }
  newGame() {
    this.tileStyles = [];
    this.disabled = !this.disabled;
    this.timerId = new Date().getSeconds();
    this.createRandomPosition();
    this.clearBgImage();
    this.isGameStart = !this.isGameStart;
  }
  startGame() {
    this.disabled = !this.disabled;
    this.dragable = !this.dragable;
    this.timerId = new Date().getSeconds();
    this.firstGame = !this.firstGame;
    this.isGameStart = !this.isGameStart;
  }
  private openScores(): void {
    this.dialog.open(ScoresComponent);
  }
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  mixPieces() {
    if (this.tileStyles.length !== 0) {
      for (let item of this.tileStyles) {
        item.top = this.getRandomInt(0, 100);
        item.left = this.getRandomInt(0, 200);
        item.zIndex = this.getRandomInt(0, 900);
      }
    }
  }
  private createRandomPosition() {
    const size = this.fieldSize * this.fieldSize;
    for (let i = 0; i < size; i++) {
      this.tileStyles.push(
        new TileStyle(
          this.puzzlePosition[i],
          this.getRandomInt(0, 100),
          this.getRandomInt(0, 200),
          this.getRandomInt(0, 900))
      );
    }
  }
}

class TileStyle {
  pos: string;
  top: number;
  left: number;
  zIndex: number;
  constructor(pos: string, top: number, left: number, zIndex: number) {
    this.pos = pos;
    this.top = top;
    this.left = left;
    this.zIndex = zIndex;
  }
}

class Tile {
  element: HTMLElement;
  photo: string;
  posx: number;
  posy: number;
  shiftX?: number;
  shiftY?: number;
  constructor(el: HTMLElement, x: number, y: number, f: string, sx: number, sy: number) {
    this.element = el;
    this.photo = f;
    this.posx = x;
    this.posy = y;
    this.shiftX = sx;
    this.shiftY = sy;
  }
}
