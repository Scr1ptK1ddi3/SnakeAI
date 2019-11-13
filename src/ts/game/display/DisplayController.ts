import {Fruit}                         from "../fruit/Fruit";
import {Direction}                     from "../plane/Direction";
import {Plane}                         from "../plane/Plane";
import {PlaneElement}                  from "../plane/PlaneElement";
import {Position}                      from "../plane/Position";
import {Snake}                         from "../snake/Snake";
import {SnakesElement}                 from "../snake/SnakesElement";
import {DisplayPlaneElementController} from "./DisplayPlaneElementController";

export class DisplayController {
    private readonly _gameDiv: HTMLDivElement;
    private readonly _planeElementTable: HTMLTableElement;
    private readonly _snakeDetailsDiv: HTMLDivElement;
    private readonly _planeElementSquareLength: number;
    private readonly _plane: Plane;
    private readonly _displayElementsControllers: DisplayPlaneElementController[];
    private _debugInfo: boolean = false;

    public static newInstance(gameDiv: HTMLDivElement, xLength: number, yLength: number, snake: Snake, planeElementSquareLength: number, debugInfo: boolean) {
        return new DisplayController(gameDiv, new Plane(xLength, yLength), snake, planeElementSquareLength, debugInfo);
    }

    public static displayInstance(gameDiv: HTMLDivElement, plane: Plane, snake: Snake, planeElementSquareLength: number, debugInfo: boolean) {
        return new DisplayController(gameDiv, plane, snake, planeElementSquareLength, debugInfo);
    }

    private constructor(gameDiv: HTMLDivElement, plane: Plane, snake: Snake, planeElementSquareLength: number, debugInfo: boolean) {
        console.time("DisplayController.constructor");

        this._gameDiv = gameDiv;
        this._plane = plane;
        this._planeElementTable = <HTMLTableElement>$("#planeTable", this._gameDiv)[0];
        this._snakeDetailsDiv = <HTMLDivElement>$("#snakeDetailsDiv", this._gameDiv)[0];
        this._planeElementSquareLength = planeElementSquareLength;
        this._displayElementsControllers = this.createDisplay();
        this._displayElementsControllers.forEach(value => value.drawState(snake));
        this.debugInfo = debugInfo;

        console.timeEnd("DisplayController.constructor");
    }

    public set debugInfo (value: boolean) {
        this._debugInfo = value;
        this._displayElementsControllers.forEach((value => value.debug = this._debugInfo));
        let squareLength: number = this._planeElementSquareLength;
        if(value && squareLength < 35) squareLength = 35;
        $("td", this._planeElementTable).css({height: squareLength + "px", width: squareLength + "px"});
    }

    private createDisplay(): DisplayPlaneElementController[] {
        const $planeElementTable: JQuery<HTMLElement> = $(this._planeElementTable);
        $planeElementTable.empty();
        $planeElementTable.append("<tr/>");

        const displayElementsControllers: DisplayPlaneElementController[] = [];
        let lastPositionY: number = 0;
        for(let i = 0; i < this._plane.planeElements.length; i++) {
            const planeElement: PlaneElement = this._plane.planeElements[i];
            const position: Position = planeElement.position;
            if(lastPositionY !== position.y) $planeElementTable.append("<tr/>");
            lastPositionY = position.y;
            const $td: JQuery<HTMLElement> = $(`<td style="height: ${this._planeElementSquareLength}px; width: ${this._planeElementSquareLength}px"/>`);
            const $div: JQuery<HTMLElement> = $("<div/>");
            $("tr:last", $planeElementTable).append($td.append($div));
            const displayElementController: DisplayPlaneElementController = new DisplayPlaneElementController($div, planeElement);
            displayElementController.debug = this._debugInfo;
            displayElementsControllers.push(displayElementController);
        }
        return displayElementsControllers;
    }

    public update(snake: Snake, fruit: Fruit): void {
        this._plane.update(snake);
        this.getElementsForDraw(snake, fruit).forEach(value => value.drawState(snake));
    }

    public updateSnakeHeadDirectionSpan = (value: Direction) => $("#headDirection", this._snakeDetailsDiv).text(value.getString());

    private getElementsForDraw(snake: Snake, fruit: Fruit): Array<DisplayPlaneElementController> {
        const elementsForDraw: DisplayPlaneElementController[] = [];
        if(snake.lastSnakeElementPosition) {
            elementsForDraw.push(this.getDisplayPlaneElementForPosition(snake.lastSnakeElementPosition));
        }
        snake.snakesElements.forEach(value => elementsForDraw.push(this.getDisplayPlaneElementForPosition(value.position)));
        elementsForDraw.push(this.getDisplayPlaneElementForPosition(fruit.planeElement.position));
        return elementsForDraw;
    }

    private getDisplayPlaneElementForPosition = (position: Position) => this._displayElementsControllers[this._plane.computePlaneElementArrayIndex(position)];
}