import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameCell } from '../game-cell';
import { FinishEvents } from '../finish-events';
import { Game } from '../game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  game: Game = new Game(5);
  @Output() openEndGame = new EventEmitter<FinishEvents>();

  onCellClick(newcurrentCell: GameCell):void{
    if(!newcurrentCell.isCanMove)
      return;

    this.game.setAfterFirstMove();
    this.game.clearMoveableCells();
    this.game.makingMove(newcurrentCell);
    this.game.setMoveableCells(newcurrentCell);
    this.openEndGame.emit(this.game.checkResult());
  }

  onStepBack(): void{
    this.game.stepBack();
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
}
