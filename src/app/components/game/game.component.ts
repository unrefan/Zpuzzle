import {AfterViewInit, Component, OnInit} from '@angular/core';
import {D, e} from '@angular/core/src/render3';
import {NotifyService} from '../../services/notify.service';
import {ScoreService} from '../../services/score.service';
import {Auth0Service} from '../../services/auth0.service';
import {NavigationComponent} from '../navigation/navigation.component';
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
  fieldSize = 3;
  node: Tile;
  dropEl;
  elem;
  items;
  timerId;
  dragable = false;
  disabled = false;
  showScore = false;
  user: User;
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
  }
  ngAfterViewInit(): void {
    this.items = document.querySelectorAll('.drop-target');
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
        item.style.backgroundColor = 'aliceblue';
      }
      (el as HTMLElement).style.backgroundColor = '#eee';
      this.elem = (el as HTMLElement);
    } else {
      for (let item of this.items) {
        item.style.backgroundColor = 'aliceblue';
      }
    }
  }
  mouseup(event) {
    this.dropEl = this.findDrop(event);
    if (!this.dropEl) { return; }
    if (this.dropEl.id === this.node.element.id) {
      this.dropEl.style.backgroundImage = 'url(\'../../assets/img/kotel.jpg\')';
      this.dropEl.style.backgroundPosition = this.node.element.style.backgroundPosition;
      const parent = this.node.element.parentNode;
      parent.removeChild(this.node.element);
      if (parent.childNodes.length < 4) {
        const win = new Date().getSeconds();
        const score = win - this.timerId;
        const name = this.user.displayName;
        this.sc.pushScore('/scores', new Score(name, score));
        this.openScores();
        this.notify.update('You win!!! Your score is ' + score + 's', 'info');
        this.showScore = !this.showScore;
      }
    }
  }
  findDrop(event) {
    this.node.element.hidden = true;
    const el = document.elementFromPoint(event.clientX, event.clientY);
    this.node.element.hidden = false;
    if (!el) { return null; }
    return el.closest('.drop-target');
  }
  startGame() {
    this.disabled = !this.disabled;
    this.dragable = !this.dragable;
    this.timerId = new Date().getSeconds();
  }
  private openScores():void {
    this.dialog.open(ScoresComponent);
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
