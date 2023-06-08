import { Component } from '@angular/core';
import { GameCell } from './game-cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  cellNumber: number = 5;
  gameBoardSize: number = 700;
  cells: GameCell[][] = [];
  moveableCells: GameCell[] = [];
  isFirstMove: boolean = true;
  currentCell?: GameCell;
  movesCell: GameCell[] = [];

  constructor(){
    this.cells = this.initialGameBoard(this.cellNumber);
  }

  logging(cell?: GameCell): void{
    console.log(cell);
  }

  initialGameBoard(boardSize: number): GameCell[][]{
    this.isFirstMove = true;
    this.movesCell = [];
    return new Array<GameCell[]>(boardSize)
    .fill(new Array<GameCell>(boardSize)
      .fill(new GameCell(0, 0)))
    .map((line, i) => line.map((cell, j) => new GameCell(i, j)));
  }

  setAfterFirstMove(): void{
    if(this.isFirstMove)
      this.cells.forEach(lines => lines.forEach(cell => cell.setDefault()));
      
    this.isFirstMove = false;
  }

  setMoveableCells(currentCell: GameCell): void{
    this.cells.forEach(lines => lines.forEach(cell => {
      if (!cell.isChecked && cell.checkMoveable(currentCell.lineNumber, currentCell.cellNumber)) {
        cell.setMoveable();
        this.moveableCells.push(cell);
      }
    }));
  }

  clearMoveableCells(): void{
    this.moveableCells.forEach(cell => cell.setDefault());
    this.moveableCells = [];
  }

  makingMove(cell: GameCell): void{
    if(this.currentCell) {
      this.currentCell.setCheacked();
      this.movesCell.push(this.currentCell);
    }

    cell.setCurrent();
    cell.setMoveNumber();
    this.currentCell = cell;
  }

  onCellClick(newcurrentCell: GameCell):void{
    if(!newcurrentCell.isCanMove)
      return;

    this.setAfterFirstMove();
    this.clearMoveableCells();
    this.makingMove(newcurrentCell);
    this.setMoveableCells(newcurrentCell);
  }

  onStepBack(): void{
    if(this.movesCell.length === 0)
      this.cells = this.initialGameBoard(this.cellNumber);
    
    this.clearMoveableCells();
    this.currentCell = this.currentCell?.cancelMove(this.movesCell.pop());
    if(this.currentCell)
      this.setMoveableCells(this.currentCell);
  }

  onReset(): void{
    this.clearMoveableCells();
    this.currentCell = undefined;
    this.cells = this.initialGameBoard(this.cellNumber);
    GameCell.reset();
  }
}
