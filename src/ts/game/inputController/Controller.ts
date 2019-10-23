import {SnakesHead} from "src/ts/game/snake/SnakesHead";
import {Direction}  from "src/ts/game/plane/Direction";

export abstract class Controller {
    protected readonly _snakeHead: SnakesHead;
    protected _currentInputDirection: Direction;

    protected constructor (snakeHead: SnakesHead) {
        this._snakeHead             = snakeHead;
        this._currentInputDirection = snakeHead.direction;
    }

    updateSnakeHeadDirection (): void {
        this._snakeHead.direction = this._currentInputDirection;
    }

    set currentInputDirection (value: Direction) {
        this._currentInputDirection = value;
    }
}