import * as $ from "jquery";

export class KeyboardEventDispatcher {
    private _window: Window;
    private _callbackFunction!: Function;

    constructor (window: Window) {
        this._window = window;
    }

    set callbackFunction (callbackFunction: Function) {
        this._callbackFunction = callbackFunction;
        $(this._window).off("keydown");
        // @ts-ignore
        $(this._window).on("keydown", this._callbackFunction);
    }
}
