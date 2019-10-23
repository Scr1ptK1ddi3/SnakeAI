import {Position} from "./plane/Position";
import {Plane} from "./plane/Plane";
import {Snake} from "./snake/Snake";
import {DisplayController} from "./display/DisplayController";
import {PlaneElement} from "./plane/PlaneElement";
import {Controller} from "./Controller";

export class GameEngine {
    private readonly _plane: Plane;
    private readonly _snake: Snake;
    private _fruit!: PlaneElement;
    private _displayController: DisplayController | undefined;
    private _controller!: Controller;

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

    static newInstance(xLength: number, yLength: number, snakeLength: number): GameEngine {
        return new GameEngine(xLength, yLength, snakeLength);
    }

    static newDisplayInstance(planeElementTable: HTMLTableElement, xLength: number, yLength: number, snakeLength: number, planeElementSquareLength: number, debugInfo: boolean): GameEngine {
        const newGameEngine: GameEngine = GameEngine.newInstance(xLength, yLength, snakeLength);
        newGameEngine.initDisplay(planeElementTable, planeElementSquareLength, debugInfo);
        return newGameEngine;
    }

    private constructor(xLength: number, yLength: number, snakeLength: number) {
        this._plane = new Plane(xLength, yLength);
        this._snake = new Snake(this._plane, snakeLength);
        this.fruit = this.getRandomBlankPosition();
        this.update();
    }

    initDisplay = (planeElementTable: HTMLTableElement, planeElementSquareLength: number, debugInfo: boolean): DisplayController =>
        this._displayController = DisplayController.displayInstance(planeElementTable, this._plane, planeElementSquareLength, debugInfo);

    update(): void {
        this._plane.update(this._snake, this._fruit);
        if(this._displayController) this._displayController.update(this._snake, this._fruit);
    }

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
}