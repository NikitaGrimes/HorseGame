import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameCell } from '../modules/game-cell';
import { FinishEvents } from '../modules/finish-events';
import { Game } from '../modules/game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {
  @Input() game: Game = new Game(10);
  @Output() openEndGame = new EventEmitter<FinishEvents>();

  onMakeMove(newCurrentCell: GameCell):void{
    let result: FinishEvents | undefined = this.game.makeMove(newCurrentCell)
    if(result)
      this.openEndGame.emit(result);
  }

  onStepBack(): void{
    this.game.makeStepBack();
  }

  onReset(): void{
    this.openEndGame.emit(FinishEvents.Restart);
  }

  onResetCellNumber(): void{
    this.game.reset();
  }

  onWin(): void{
    this.openEndGame.emit(FinishEvents.Win);
  }

  onLose(): void{
    this.openEndGame.emit(FinishEvents.Lose);
  }

  incSize(): void{
    if (this.game.cellNumber + 1 > Game.MAX_CELL_SIZE)
      return;
    
    this.game.cellNumber++;
    this.onResetCellNumber();
  }

  decSize(): void{
    if (this.game.cellNumber - 1 < Game.MIN_CELL_SIZE)
      return;
    
    this.game.cellNumber--;
    this.onResetCellNumber();
  }
}
