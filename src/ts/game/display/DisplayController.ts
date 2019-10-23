import * as $ from "jquery";
import {Plane} from "../plane/Plane";
import {PlaneElement} from "../plane/PlaneElement";
import {Position} from "../plane/Position";
import {Snake} from "../snake/Snake";
import {DisplayElementController} from "./DisplayElementController";

export class DisplayController {
    private readonly _planeElementTable: HTMLTableElement;
    private readonly _planeElementSquareLength: number;
    private readonly _plane: Plane;
    private readonly _displayElementsControllers: DisplayElementController[];
    private _debugInfo: boolean = false;

    static newInstance(planeElementTable: HTMLTableElement, xLength: number, yLength: number, planeElementSquareLength: number, debugInfo: boolean) {
        return new DisplayController(planeElementTable, new Plane(xLength, yLength), planeElementSquareLength, debugInfo);
    }

    static displayInstance(planeElementTable: HTMLTableElement, plane: Plane, planeElementSquareLength: number, debugInfo: boolean) {
        return new DisplayController(planeElementTable, plane, planeElementSquareLength, debugInfo);
    }

    private constructor(planeElementTable: HTMLTableElement, plane: Plane, planeElementSquareLength: number, debugInfo: boolean) {
        this._plane = plane;
        this._planeElementTable = planeElementTable;
        this._planeElementSquareLength = planeElementSquareLength;
        this._displayElementsControllers = this.createDisplay();
        this.debugInfo = debugInfo;
    }

    set debugInfo (value: boolean) {
        this._debugInfo = value;
        this._displayElementsControllers.forEach((value => value.debug = this._debugInfo));
        let squareLength: number = this._planeElementSquareLength;
        if(value && squareLength < 35) squareLength = 35;
        $("td", this._planeElementTable).css({height: squareLength + "px", width: squareLength + "px"});
    }

    update(snake: Snake, fruit: PlaneElement): void {
        this._plane.update(snake, fruit);
        this._displayElementsControllers.forEach(value => value.drawState(snake));
    }

    private createDisplay(): DisplayElementController[] {
        const $planeElementTable: JQuery<HTMLElement> = $(this._planeElementTable);
        $planeElementTable.empty();
        $planeElementTable.append("<tr/>");

        const displayElementsControllers: DisplayElementController[] = [];
        let lastPositionY: number = 0;
        for(let i = 0; i < this._plane.planeElements.length; i++) {
            const planeElement: PlaneElement = this._plane.planeElements[i];
            const position: Position = planeElement.position;
            if(lastPositionY !== position.y) $planeElementTable.append("<tr/>");
            lastPositionY = position.y;
            const $td: JQuery<HTMLElement> = $(`<td style="height: ${this._planeElementSquareLength}px; width: ${this._planeElementSquareLength}px"/>`);
            const $div: JQuery<HTMLElement> = $("<div/>");
            $("tr:last", $planeElementTable).append($td.append($div));
            const displayElementController: DisplayElementController = new DisplayElementController($div, planeElement);
            displayElementController.debug = this._debugInfo;
            displayElementsControllers.push(displayElementController);
        }
        return displayElementsControllers;
    }

}