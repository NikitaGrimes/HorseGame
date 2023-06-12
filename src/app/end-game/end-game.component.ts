import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinishEvents } from '../models/finish-events';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent {
  @Input() finishEvent?: FinishEvents;
  @Output() restartGame = new EventEmitter<boolean>();
  allFinishEvents = FinishEvents;

  restart(): void{
    this.restartGame.emit(true);
  }

  return(): void{
    this.restartGame.emit(false);
  }
}
