import {Controller} from "src/ts/game/inputController/Controller";
import {SnakesHead} from "../snake/SnakesHead";

export class HumanInputController extends Controller {

    constructor(snakeHead: SnakesHead) {
        super(snakeHead);
    }

    keyPressEventCallback(event: KeyboardEvent): void {
        console.log(event);
    }

}