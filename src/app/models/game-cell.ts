export class GameCell {
    private static readonly _moves: Array<readonly [number, number]> = [
        [+1, +2],
        [+2, +1],
        [-1, +2],
        [-2, +1],
        [+1, -2],
        [+2, -1],
        [-1, -2],
        [-2, -1],
    ]

    private static _movesNumber = 0;

    constructor(public lineNumber: number, public cellNumber: number, public isChecked: boolean = false, 
        public isCanMove: boolean = false, public isCurrent: boolean = false, public moveNumber?: number){

    }

    setCheacked(): void{
        this.isChecked = true;
        this.isCanMove = this.isCurrent = false;
    }

    setMoveable(): void{
        this.isCanMove = true;
        this.isChecked = this.isCurrent = false;
    }

    setCurrent(): void{
        this.isCurrent = true;
        this.isChecked = this.isCanMove = false;
    }

    setMoveNumber(): void{
        this.moveNumber = ++GameCell._movesNumber;
    }

    setDefault(): void{
        this.isCurrent = this.isCanMove = this.isChecked = false;
        this.moveNumber = undefined;
    }

    checkMoveable(line: number, cell: number): boolean{
        return GameCell._moves
            .map(move => [move[0] + this.lineNumber, move[1] + this.cellNumber])
            .some(move => move[0] === line && move[1] === cell);
    }

    static reset(): void{
        this._movesNumber = 0;
    }

    static decrementMovesNumber(): void{
        if (this._movesNumber)
            --this._movesNumber;
    }
}
