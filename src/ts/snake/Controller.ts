import {SnakesHead} from "./SnakesHead";
import {Direction} from "./plane/Direction";

export abstract class Controller {
    private readonly _snakeHead: SnakesHead;
    private _currentInputDirection: Direction;

    protected constructor(snakeHead: SnakesHead) {
        this._snakeHead = snakeHead;
        this._currentInputDirection = snakeHead.direction;
    }

    updateSnakeHeadDirection(): void {
        this._snakeHead.direction = this._currentInputDirection;
    }

    set currentInputDirection (value: Direction) {
        this._currentInputDirection = value;
    }
}