import {Fruit}                   from "./fruit/Fruit";
import {Controller}              from "./inputController/Controller";
import {DisplayController}       from "./display/DisplayController";
import {HumanInputController}    from "./inputController/HumanInputController";
import {KeyboardEventDispatcher} from "./inputController/keyboard/KeyboardEventDispatcher";
import {KeyboardEventHandler}    from "./inputController/keyboard/KeyboardEventHandler";
import {Plane}                   from "./plane/Plane";
import {Position}                from "./plane/Position";
import {Snake}                   from "./snake/Snake";

export class GameEngine {
    private readonly _keyboardEventHandler: KeyboardEventHandler = KeyboardEventHandler.getInstance();

    private readonly _plane: Plane;
    private readonly _snake: Snake;
    private _fruit!: Fruit;
    private _displayController!: DisplayController;
    private _controller!: Controller;

    private _isRunning: boolean = false;

    private constructor (xLength: number, yLength: number, snakeLength: number) {
        this._plane = new Plane(xLength, yLength);
        this._snake = new Snake(this._plane, snakeLength);
        this.fruit = this.getRandomBlankPosition();
    }

    private set fruit (position: Position) {
        if (this._fruit) {
            this._fruit.planeElement.setBlank();
        }
        this._fruit = Fruit.getNewInstance(position, this._plane);
    }

    public static getRandomPosition (plane: Plane): Position {
        const randomX = GameEngine.randomInt(1, plane.xLength - 1);
        const randomY = GameEngine.randomInt(1, plane.yLength - 1);
        return new Position(randomX, randomY);
    }

    public static getRandomMidPosition (plane: Plane): Position {
        const randomMidX = GameEngine.randomInt(Math.floor(plane.xLength / 3), Math.floor(2 * plane.xLength / 3));
        const randomMidY = GameEngine.randomInt(Math.floor(plane.yLength / 3), Math.floor(2 * plane.yLength / 3));
        return new Position(randomMidX, randomMidY);
    }

    public static randomInt = (min: number = 0, max: number = 10): number => Math.floor(Math.random() * (max - min + 1)) + min;

    public static newInstance (xLength: number, yLength: number, snakeLength: number): GameEngine {
        return new GameEngine(xLength, yLength, snakeLength);
    }

    public static newDisplayInstance (planeElementTable: HTMLTableElement, xLength: number, yLength: number, snakeLength: number, planeElementSquareLength: number, debugInfo: boolean): GameEngine {
        const newGameEngine: GameEngine = GameEngine.newInstance(xLength, yLength, snakeLength);
        GameEngine.initDisplay(newGameEngine, planeElementTable, planeElementSquareLength, debugInfo);
        return newGameEngine;
    }

    public static initDisplay(gameEngine: GameEngine, planeElementTable: HTMLTableElement, planeElementSquareLength: number, debugInfo: boolean): void {
        gameEngine._displayController = DisplayController.displayInstance(planeElementTable, gameEngine._plane, planeElementSquareLength, debugInfo);
        gameEngine.update();
    }

    public update (): void {
        if (this._displayController) {
            this._displayController.update(this._snake);
            this._displayController.updateSnakeHeadDirectionSpan(this._snake.head.direction);
        } else {
            this._plane.update(this._snake)
        }
    }

    public tick (): void {
        if (!this._controller) return;

        this._snake.move();
    }

    public getRandomBlankPosition (): Position {
        let position: Position = GameEngine.getRandomPosition(this._plane);
        while (!this._plane.getPlaneElementForPosition(position).isBlank()) position = GameEngine.getRandomPosition(this._plane);
        return position;
    }

    public initializeHumanController (): void {
        const humanInputController: HumanInputController = new HumanInputController(this._snake.head);
        humanInputController.gameEngine = this;
        KeyboardEventDispatcher.humanInputController = humanInputController;
        this._controller = humanInputController;
    }

    public initializeAIController (): void {

    }

    //@ts-ignore
    public humanInputControllerPostProcess(event: KeyboardEventDispatcher): void {
        this._displayController.updateSnakeHeadDirectionSpan(this._snake.head.direction);
    }

    public set debugInfo(value: boolean) {
        this._displayController && (this._displayController.debugInfo = value);
    }

    public set isRunning(value: boolean) {
        this._isRunning = value;
    }

}