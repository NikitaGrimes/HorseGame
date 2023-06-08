import { Component, ViewChild } from '@angular/core';
import { FinishEvents } from './finish-events';
import { GameBoardComponent } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  finishEvent?: FinishEvents;
  @ViewChild('gameBoard') gameBoard?: GameBoardComponent;
  
  openEndGame(event: FinishEvents): void{
    this.finishEvent = event;
  }

  restartGame(isReset: boolean): void{
    this.finishEvent = undefined;
    if (isReset)
      this.gameBoard?.game.reset();
  }
}
