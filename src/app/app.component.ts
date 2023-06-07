import { Component, OnInit } from '@angular/core';
import { GameCell } from './game-cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cellNumber: number = 9;
  gameBoardSize: number = 700;
  cells: GameCell[][] = [];
  
  ngOnInit(): void {
    this.cells = new Array<GameCell[]>(this.cellNumber).fill(new Array<GameCell>(this.cellNumber)).map((line, i) => line.map((cell, j) => new GameCell(i, j)));
  }

  onClick(line: number, cell: number):void{
    console.log(line + " " + cell);
  }
}
