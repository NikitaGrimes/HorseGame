import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameCell } from '../models/game-cell';
import { FinishEvents } from '../models/finish-events';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {
  @Input() game: Game = new Game(10);
  @Output() openEndGame = new EventEmitter<FinishEvents>();

  makeMove(newCurrentCell: GameCell):void{
    const result: FinishEvents | undefined = this.game.makeMove(newCurrentCell)
    if(result)
      this.openEndGame.emit(result);
  }

  makeStepBack(): void{
    this.game.makeStepBack();
  }

  reset(): void{
    this.openEndGame.emit(FinishEvents.Restart);
  }

  resetCellNumber(): void{
    this.game.reset();
  }

  win(): void{
    this.openEndGame.emit(FinishEvents.Win);
  }

  lose(): void{
    this.openEndGame.emit(FinishEvents.Lose);
  }

  incrementSize(): void{
    if (this.game.cellNumber + 1 > Game.MAX_CELL_SIZE)
      return;
    
    this.game.cellNumber++;
    this.resetCellNumber();
  }

  decrementSize(): void{
    if (this.game.cellNumber - 1 < Game.MIN_CELL_SIZE)
      return;
    
    this.game.cellNumber--;
    this.resetCellNumber();
  }
}
