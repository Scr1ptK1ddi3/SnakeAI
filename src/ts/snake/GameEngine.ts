import {Position} from "./plane/Position";
import {Plane} from "./plane/Plane";
import {Snake} from "./Snake";
import {DisplayPlane} from "./plane/DisplayPlane";
import {PlaneElement} from "./plane/PlaneElement";
import {Controller} from "./Controller";

export class GameEngine {
    private readonly _plane: Plane;
    private readonly _snake: Snake;
    private _fruit!: PlaneElement;
    private _controller!: Controller;

    constructor(xLength: number, yLength: number, snakeLength: number, planeElementTable: HTMLTableElement, planeElementSquareLength: number, debugInfo: boolean) {
        this._plane = planeElementTable && planeElementSquareLength ? new DisplayPlane(planeElementTable, xLength, yLength, planeElementSquareLength, debugInfo) : new Plane(xLength, yLength);
        this._snake = new Snake(this._plane, snakeLength);
        this.fruit = this.getRandomBlankPosition();
        this.update();
    }

    isDisplay = (): boolean => this._plane instanceof DisplayPlane;
    update = (): void => this._plane.update(this._snake, this._fruit);

    tick(): void {
        if(!this._controller) return;

        this._controller.updateSnakeHeadDirection();
        this._snake.move();

    }

    getRandomBlankPosition(): Position {
        let position: Position = GameEngine.getRandomPosition(this._plane);
        while(!this._plane.getPlaneElementForPosition(position).isBlank()) position = GameEngine.getRandomPosition(this._plane);
        return position;
    }

    initializeHumanController(): void {

    }

    initializeAIController(): void {

    }

    private set fruit(position: Position) {
        if(this._fruit) {
            this._fruit.setBlank();
        }
        this._fruit = this._plane.getPlaneElementForPosition(position);
        this._fruit.setFruit();
    }

    static getRandomPosition(plane: Plane): Position {
        const randomX = GameEngine.randomInt(1, plane.xLength - 1);
        const randomY = GameEngine.randomInt(1, plane.yLength - 1);
        return new Position(randomX, randomY);
    }

    static getRandomMidPosition(plane: Plane): Position {
        const randomMidX = GameEngine.randomInt(Math.floor(plane.xLength/3), Math.floor(2 * plane.xLength/3));
        const randomMidY = GameEngine.randomInt(Math.floor(plane.yLength/3), Math.floor(2 * plane.yLength/3));
        return new Position(randomMidX, randomMidY);
    }

    static randomInt = (min: number = 0, max: number = 10): number => Math.floor(Math.random() * (max - min + 1)) + min;
}