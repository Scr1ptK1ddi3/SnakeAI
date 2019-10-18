import * as $ from "jquery";
import {Plane} from "./Plane";
import {PlaneElement} from "./PlaneElement";
import {Position} from "./Position";
import {VisualPlaneElement} from "./VisualPlaneElement";
import {Snake} from "../Snake";

export class DisplayPlane extends Plane {
    private readonly _planeElementTable: HTMLTableElement;
    private readonly _displayPlaneElements: VisualPlaneElement[];
    private readonly _planeElementSquareLength: number;
    private _debugInfo: boolean = false;

    constructor(planeElementTable: HTMLTableElement, xLength: number, yLength: number, planeElementSquareLength: number, debugInfo: boolean) {
        super(xLength, yLength);
        this._planeElementTable = planeElementTable;
        this._planeElementSquareLength = planeElementSquareLength;
        this._displayPlaneElements = this.createDisplay();
        this.debugInfo = debugInfo;
    }

    set debugInfo (value: boolean) {
        this._debugInfo = value;
        this.updateDebug();
        let squareLength: number = this._planeElementSquareLength;
        if(value && squareLength < 35) squareLength = 35;
        $("td", this._planeElementTable).css({height: squareLength + "px", width: squareLength + "px"});
    }

    private updateDebug = (): void => this._displayPlaneElements.forEach(this._debugInfo ? DisplayPlane.insertDebugInfo : DisplayPlane.clearDebugInfo);

    private static insertDebugInfo = (value: VisualPlaneElement): any => value.$div.html(
            `<span name="position">${value.position.x} : ${value.position.y}</span>
                 <br/>
                 <span name="snakeIndex"/>`);

    private static clearDebugInfo = (value: VisualPlaneElement) => $(value.$div).html("");

    private createDisplay(): VisualPlaneElement[] {
        const $planeElementTable: JQuery<HTMLElement> = $(this._planeElementTable);
        $planeElementTable.empty();
        $planeElementTable.append("<tr/>");

        const visualPlaneElements: VisualPlaneElement[] = [];
        let lastPositionY: number = 0;
        for(let i = 0; i < this.planeElements.length; i++) {
            const planeElement: PlaneElement = this.planeElements[i];
            const position: Position = planeElement.position;
            if(lastPositionY !== position.y) $planeElementTable.append("<tr/>");
            lastPositionY = position.y;
            const $td: JQuery<HTMLElement> = $(`<td style="height: ${this._planeElementSquareLength}px; width: ${this._planeElementSquareLength}px"/>`);
            const $div: JQuery<HTMLElement> = $("<div/>");
            $("tr:last", $planeElementTable).append($td.append($div));
            const visualPlaneElement: VisualPlaneElement = new VisualPlaneElement(position, $div);
            if(this._debugInfo) DisplayPlane.insertDebugInfo(visualPlaneElement);
            visualPlaneElements.push(visualPlaneElement);
        }
        return visualPlaneElements;
    }

    update(snake: Snake, fruit: PlaneElement): void {
        super.update(snake, fruit);
        for (let i = 0; i < this._displayPlaneElements.length; i++) {
            const displayPlaneElement = this._displayPlaneElements[i];
            displayPlaneElement.state = this.planeElements[i].state;
            displayPlaneElement.drawState(snake);
        }
    }
}