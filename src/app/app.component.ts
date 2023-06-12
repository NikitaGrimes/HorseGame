import { Component } from '@angular/core';
import { FinishEvents } from './models/finish-events';
import { Game } from './models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  finishEvent?: FinishEvents;
  game: Game = new Game(10);
  
  openEndGame(event: FinishEvents): void{
    this.finishEvent = event;
  }

  restartGame(isReset: boolean): void{
    this.finishEvent = undefined;
    if (isReset)
      this.game.reset();
  }
}
