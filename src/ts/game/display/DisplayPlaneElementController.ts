import {PlaneElement} from "../plane/PlaneElement";
import {Snake}        from "../snake/Snake";

export class DisplayPlaneElementController {
    private readonly _$div: JQuery<HTMLElement>;
    private readonly _planeElement: PlaneElement;

    constructor ($div: JQuery<HTMLElement>, planeElement: PlaneElement) {
        this._$div = $div;
        this._planeElement = planeElement;
    }

    set debug (value: boolean) {
        if (value) {
            this.insertDebugInfo();
        } else {
            this.clearDebugInfo();
        }
    }

    drawState (snake: any): void {
        this._$div.removeAttr("class");
        if (this._planeElement.isBlank()) this._$div.addClass("blankElement");
        if (this._planeElement.isSnake()) {
            const snakeElementForPlaneElement = snake.getSnakeElementForPosition(this._planeElement.position);
            $("span[name='snakeIndex']", this._$div).text(snake.snakesElements.indexOf(snakeElementForPlaneElement));
            if (snake && this._planeElement.position.equals((<Snake>snake).head.position)) {
                this._$div.addClass("snakeHead");
            } else {
                this._$div.addClass("snakeElement");
            }
        } else {
            $("span[name='snakeIndex']", this._$div).text(-1);
        }
        if (this._planeElement.isFruit()) this._$div.addClass("fruitElement");
    }

    private insertDebugInfo = () => this._$div.html(
        `<span name="position">${this._planeElement.position.x} : ${this._planeElement.position.y}</span>
                 <br/>
                 <span name="snakeIndex"/>`);

    private clearDebugInfo = (): JQuery<HTMLElement> => this._$div.html("");

}