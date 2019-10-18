export class Position {
    readonly x: number;
    readonly y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    equals = (position: Position): boolean => this.x === position.x && this.y === position.y;
    toString = (): string => `${this.x} : ${this.y}`;

}