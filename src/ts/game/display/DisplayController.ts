import {Fruit}                         from "../fruit/Fruit";
import {Direction}                     from "../plane/Direction";
import {Plane}                         from "../plane/Plane";
import {PlaneElement}                  from "../plane/PlaneElement";
import {Position}                      from "../plane/Position";
import {Snake}                         from "../snake/Snake";
import {DisplayPlaneElementController} from "./DisplayPlaneElementController";

export class DisplayController {
    private readonly _gameDiv: HTMLDivElement
    private readonly _planeElementTable: HTMLTableElement;
    private readonly _snakeDetailsDiv: HTMLDivElement;
    private readonly _planeElementSquareLength: number;
    private readonly _plane: Plane;
    private readonly _displayElementsControllers: DisplayPlaneElementController[];
    private _debugInfo: boolean = false;

    public static newInstance(gameDiv: HTMLDivElement, xLength: number, yLength: number, planeElementSquareLength: number, debugInfo: boolean) {
        return new DisplayController(gameDiv, new Plane(xLength, yLength), planeElementSquareLength, debugInfo);
    }

    public static displayInstance(gameDiv: HTMLDivElement, plane: Plane, planeElementSquareLength: number, debugInfo: boolean) {
        return new DisplayController(gameDiv, plane, planeElementSquareLength, debugInfo);
    }

    private constructor(gameDiv: HTMLDivElement, plane: Plane, planeElementSquareLength: number, debugInfo: boolean) {
        this._gameDiv = gameDiv;
        this._plane = plane;
        this._planeElementTable = <HTMLTableElement>$("#planeTable", this._gameDiv)[0];
        this._snakeDetailsDiv = <HTMLDivElement>$("#snakeDetailsDiv", this._gameDiv)[0];
        this._planeElementSquareLength = planeElementSquareLength;
        this._displayElementsControllers = this.createDisplay();
        this.debugInfo = debugInfo;
    }

    public set debugInfo (value: boolean) {
        this._debugInfo = value;
        this._displayElementsControllers.forEach((value => value.debug = this._debugInfo));
        let squareLength: number = this._planeElementSquareLength;
        if(value && squareLength < 35) squareLength = 35;
        $("td", this._planeElementTable).css({height: squareLength + "px", width: squareLength + "px"});
    }

    public update(snake: Snake): void {
        this._plane.update(snake);
        this._displayElementsControllers.forEach(value => value.drawState(snake));
    }

    public updateSnakeHeadDirectionSpan = (value: Direction) => $("#headDirection", this._snakeDetailsDiv).text(value.getString());

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

}