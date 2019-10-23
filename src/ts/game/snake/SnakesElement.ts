import {Position} from "../plane/Position";
import {Snake} from "./Snake";
import {Direction} from "../plane/Direction";

export class SnakesElement {
    private readonly _snake: Snake;
    private _position: Position;

    constructor (position: Position, snake: Snake) {
        this._position = position;
        this._snake = snake;
    }

    set position (value: Position) {
        this._position = value;
    }

    get position (): Position {
        return this._position;
    }

    get direction (): Direction {
        return Direction.calculateDirection(this._position, this._snake.getPreviousSnakeElementForElement(this)._position);
    }

    move(): void {
        this._position = this.direction.calculateNewPosition(this._position);
    }

}

