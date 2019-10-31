import {Direction}  from "src/ts/game/plane/Direction";
import {SnakesHead} from "src/ts/game/snake/SnakesHead";

export abstract class Controller {
    protected readonly _snakeHead: SnakesHead;

    protected constructor (snakeHead: SnakesHead) {
        this._snakeHead = snakeHead;
    }

    set currentInputDirection (value: Direction) {
        this._snakeHead.direction = value;
    }

}