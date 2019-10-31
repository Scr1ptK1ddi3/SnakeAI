import {KeyboardEventDispatcher} from "./KeyboardEventDispatcher";

export class KeyboardEventHandler {
    private static _instance: KeyboardEventHandler;
    private static readonly _ignoredKeys: [string] = ["F12"];

    private constructor() {
        $(window).off("keydown");
        //@ts-ignore
        $(window).on("keydown", this.handleKeyDown);
        console.log("Reigstered keydown event handler.");
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if(KeyboardEventHandler._ignoredKeys.indexOf(event.key) !== -1) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        KeyboardEventDispatcher.dispatchKeyDownEvent(event);
    }

    static getInstance = () => KeyboardEventHandler._instance ? KeyboardEventHandler._instance : KeyboardEventHandler._instance = new KeyboardEventHandler();

}