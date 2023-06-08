import { Component } from '@angular/core';
import { GameCell } from './game-cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  cellNumber: number = 9;
  gameBoardSize: number = 700;
  cells: GameCell[][] = [];
  moveableCells: GameCell[] = [];
  prevMove?: GameCell = undefined;
  currentMove?: GameCell = undefined;

  constructor(){
    this.cells = this.initialGameBoard();
  }

  logging(cell: GameCell): void{
    console.log(cell);
  }

  initialGameBoard(): GameCell[][]{
    return new Array<GameCell[]>(this.cellNumber)
    .fill(new Array<GameCell>(this.cellNumber)
      .fill(new GameCell(0, 0)))
    .map((line, i) => line.map((cell, j) => new GameCell(i, j)));
  }

  setFirstMove(): void{
    if(!this.currentMove)
      this.cells.forEach(lines => lines.forEach(cell => cell.setDefault()));
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
    this.prevMove = this.currentMove;
    this.currentMove = cell;
    cell.setCurrent();
    if(this.prevMove)
      this.prevMove.setCheacked();
  }

  onClick(newcurrentCell: GameCell):void{
    this.logging(newcurrentCell);
    if(!newcurrentCell.isCanMove)
      return;

    this.setFirstMove();
    this.clearMoveableCells();
    this.makingMove(newcurrentCell);
    this.setMoveableCells(newcurrentCell);
  }
}
