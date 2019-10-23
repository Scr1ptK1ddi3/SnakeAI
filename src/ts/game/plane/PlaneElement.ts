import {Position} from "./Position";

export enum State {
    snake = -1,
    blank,
    fruit
}

export class PlaneElement {
    private readonly _position: Position;
    private _state: number = 0;

    constructor (position: Position) {
        this._position = position;
    }

    get position (): Position {
        return this._position;
    }

    get state (): State {
        return this._state;
    }

    set state (value: State) {
        this._state = value;
    }

    setFruit = (): number => this._state = State.fruit;
    isFruit  = (): boolean => this._state === State.fruit;
    setBlank = (): number => this._state = State.blank;
    isBlank  = (): boolean => this._state === State.blank;
    setSnake = (): number => this._state = State.snake;
    isSnake  = (): boolean => this._state === State.snake;
}