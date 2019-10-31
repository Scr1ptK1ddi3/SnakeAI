import {GameEngine}           from "../../GameEngine";
import {HumanInputController} from "../HumanInputController";

export class KeyboardEventDispatcher {
    private static _humanInputController: HumanInputController;
    private static _gameEngine: GameEngine;

    public static set humanInputController (value: HumanInputController) {
        this._humanInputController = value;
    }

    public static dispatchKeyDownEvent(event: KeyboardEvent) {
        if(KeyboardEventDispatcher._humanInputController) {
            KeyboardEventDispatcher._humanInputController.keyDown(event);
        }
        if(this._gameEngine) {
            this._gameEngine.humanInputControllerPostProcess(event);
        }
    }
}
