import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinishEvents } from '../finish-events';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent {
  @Input() finishEvent?: FinishEvents;
  @Output() restartGame = new EventEmitter<boolean>();
  allFinishEvents = FinishEvents;

  restart(): void{
    this.finishEvent = undefined;
    this.restartGame.emit(true);
  }

  back(): void{
    this.finishEvent = undefined;
    this.restartGame.emit(false);
  }
}
