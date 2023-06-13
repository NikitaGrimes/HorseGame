import { FinishEvents } from "./finish-events";
import { GameCell } from "./game-cell";

export class Game {
    cells: GameCell[][] = [];
    moveableCells: GameCell[] = [];
    isFirstMove = true;
    currentCell?: GameCell;
    movesCell: GameCell[] = [];
    static readonly MAX_CELL_SIZE: number = 20;
    static readonly MIN_CELL_SIZE: number = 1;

    constructor(public cellNumber: number){
      this.cells = this.initGameBoard();
    }

    initGameBoard(): GameCell[][]{
      this.isFirstMove = true;
      this.movesCell = [];
      return new Array<GameCell[]>(this.cellNumber)
        .fill(new Array<any>(this.cellNumber)
          .fill(undefined))
        .map((line, i) => line.map((_, j) => new GameCell(i, j)));
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
    
    makeMove(newCurrentCell: GameCell): FinishEvents | undefined{
      if(!newCurrentCell.isCanMove && !this.isFirstMove)
        return;
        
      this.isFirstMove = false;
      this.clearMoveableCells();
      if(this.currentCell) {
        this.currentCell.setCheacked();
        this.movesCell.push(this.currentCell);
      }
    
      newCurrentCell.setCurrent();
      newCurrentCell.setMoveNumber();
      this.currentCell = newCurrentCell;
      this.setMoveableCells(newCurrentCell);
      return this.checkResult()
    }

    makeStepBack(): void{
      if(this.movesCell.length === 0)
        this.cells = this.initGameBoard();
    
      this.clearMoveableCells();
      this.currentCell = this.cancelMove(this.movesCell.pop());
      if(this.currentCell)
        this.setMoveableCells(this.currentCell);
    }

    cancelMove(prevCell?: GameCell): GameCell | undefined{
        this.currentCell?.setDefault();
        GameCell.decrementMovesNumber();
        prevCell?.setCurrent();
        return prevCell;
    }

    reset(): void{
      this.clearMoveableCells();
      this.currentCell = undefined;
      this.cells = this.initGameBoard();
      GameCell.reset();
    }

    checkResult(): FinishEvents | undefined{
      if (this.movesCell.length === (this.cellNumber ** 2 - 1))
        return FinishEvents.Win;
      
      if (this.moveableCells.length === 0)
        return FinishEvents.Lose;

      return undefined;
    }
}
