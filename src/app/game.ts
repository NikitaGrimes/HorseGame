import { FinishEvents } from "./finish-events";
import { GameCell } from "./game-cell";

export class Game {
    cells: GameCell[][] = [];
    moveableCells: GameCell[] = [];
    isFirstMove: boolean = true;
    currentCell?: GameCell;
    movesCell: GameCell[] = [];

    constructor(public cellNumber: number){
      this.cells = this.initialGameBoard();
    }

    initialGameBoard(): GameCell[][]{
      this.isFirstMove = true;
      this.movesCell = [];
      return new Array<GameCell[]>(this.cellNumber)
        .fill(new Array<GameCell>(this.cellNumber)
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

    stepBack(): void{
      if(this.movesCell.length === 0)
        this.cells = this.initialGameBoard();
    
      this.clearMoveableCells();
      this.currentCell = this.currentCell?.cancelMove(this.movesCell.pop());
      if(this.currentCell)
        this.setMoveableCells(this.currentCell);
    }

    reset(): void{
      this.clearMoveableCells();
      this.currentCell = undefined;
      this.cells = this.initialGameBoard();
      GameCell.reset();
    }

    checkResult(): FinishEvents | undefined{
      if (this.cells.every(line => line.every(cell => cell.isCurrent || cell.isChecked)))
        return FinishEvents.Win;
      
      if (this.moveableCells.length === 0)
        return FinishEvents.Lose;

      return undefined;
    }
}
