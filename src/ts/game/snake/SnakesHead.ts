import {Position}      from "../plane/Position";
import {SnakesElement} from "./SnakesElement";
import {Snake}         from "./Snake";
import {Direction}     from "../plane/Direction";

export class SnakesHead extends SnakesElement {
    private _direction: Direction;

    constructor (position: Position, snake: Snake, direction: Direction) {
        super(position, snake);
        this._direction = direction;
    }

    get direction (): Direction {
        return this._direction;
    }

    set direction (value: Direction) {
        this._direction = value;
    }

    move (): void {
        this.position = this._direction.calculateNewPosition(this.position);
    }

    toString = () => `SnakeHead {direction: ${this.direction}}`;
}