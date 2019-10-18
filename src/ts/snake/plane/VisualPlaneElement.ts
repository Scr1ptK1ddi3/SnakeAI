import {PlaneElement} from "./PlaneElement";
import {Position} from "./Position";
import {Snake} from "../Snake";

export class VisualPlaneElement extends PlaneElement {
    private readonly _$div: JQuery<HTMLElement>;

    constructor(position: Position, $div: JQuery<HTMLElement>) {
        super(position);
        this._$div = $div;
        this.drawState(null);
    }

    get $div (): JQuery<HTMLElement> {
        return this._$div;
    }

    drawState(snake: any): void {
        this._$div.removeAttr("class");
        if(this.isSnake())  {
            const snakeElementForPlaneElement = snake.getSnakeElementForPosition(this.position);
            $("span[name='snakeIndex']", this._$div).text(snake.snakesElements.indexOf(snakeElementForPlaneElement));
            if(snake && this.position.equals((<Snake>snake).head.position)) {
                this._$div.addClass("snakeHead")
            } else this._$div.addClass("snakeElement");
        } else $("span[name='snakeIndex']", this._$div).text(-1);
        if(this.isFruit()) this._$div.addClass("fruitElement");
        if(this.isBlank()) this._$div.addClass("blankElement");
    }

}