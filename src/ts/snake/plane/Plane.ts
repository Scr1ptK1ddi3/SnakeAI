import {Position} from "./Position";
import {PlaneElement} from "./PlaneElement";
import {Snake} from "../Snake";

export class Plane {
    private readonly _xLength: number;
    private readonly _yLength: number;
    private readonly _planeElements: PlaneElement[] = [];

    constructor (xLength: number, yLength: number) {
        this._xLength = xLength;
        this._yLength = yLength;
        for (let y = 0; y < yLength; y++) {
            for (let x = 0; x < xLength; x++) {
                const position: Position = new Position(x, y);
                this._planeElements.push(new PlaneElement(position));
            }
        }
    }

    computePlaneElementArrayIndex = (position: Position): number  => position.x + position.y * this._yLength;
    getPlaneElementForPosition = (position: Position): PlaneElement => this._planeElements[this.computePlaneElementArrayIndex(position)];

    update(snake: Snake, fruit: PlaneElement): void  {
        this.clearStates();
        fruit.setFruit();
        for (let snakeElement of snake.snakesElements) {
            let snakeElementPosition: Position = snakeElement.position;
            this._planeElements[this.computePlaneElementArrayIndex(snakeElementPosition)].setSnake();
        }
    }

    private clearStates(): void {
        for (let planeElement of this._planeElements) {
            planeElement.setBlank();
        }
    }


    get xLength (): number {
        return this._xLength;
    }

    get yLength (): number {
        return this._yLength;
    }

    get planeElements (): PlaneElement[] {
        return this._planeElements;
    }
}
