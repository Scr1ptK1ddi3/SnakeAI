import {GameEngine} from "../GameEngine";
import {Direction}  from "../plane/Direction";
import {SnakesHead} from "../snake/SnakesHead";
import {Controller} from "./Controller";

export class HumanInputController extends Controller {
    public gameEngine!: GameEngine;

    constructor (snakeHead: SnakesHead) {
        super(snakeHead);
    }

    keyDown (event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.currentInputDirection = Direction.Up;
                break;
            case "ArrowRight":
                this.currentInputDirection = Direction.Right;
                break;
            case "ArrowDown":
                this.currentInputDirection = Direction.Down;
                break;
            case "ArrowLeft":
                this.currentInputDirection = Direction.Left;
                break;
        }
        this.gameEngine.humanInputControllerPostProcess(event);
    }

}