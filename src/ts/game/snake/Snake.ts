import {Fruit}                     from "../fruit/Fruit";
import {GameEngine}                from "../GameEngine";
import {Direction, DirectionValue} from "../plane/Direction";
import {Plane}                     from "../plane/Plane";
import {Position}                  from "../plane/Position";
import {SnakesElement}             from "./SnakesElement";
import {SnakesHead}                from "./SnakesHead";

export class Snake {
    private readonly _snakesElements: Array<SnakesElement> = [];
    private readonly _plane: Plane;

    public lastSnakeElementPosition!: Position;

    constructor (plane: Plane, snakeLength: number) {
        this._plane = plane;
        const randomHeadPosition: Position = GameEngine.getRandomMidPosition(this._plane);
        this._snakesElements.push(new SnakesHead(randomHeadPosition, this, Direction.randomDirection()));
        for (let i = 1; i < snakeLength; i++) {
            this.addNewSnakeElement(null);
        }
        this._plane.update(this);
    }

    get snakesElements (): Array<SnakesElement> {
        return this._snakesElements;
    }

    get head (): SnakesHead {
        return this.getHead();
    }

    get lastElement (): SnakesElement {
        return this.getLastElement();
    }

    getElement = (index: number): SnakesElement => this._snakesElements[index];

    getPreviousSnakeElementForElement = (snakeElement: SnakesElement): SnakesElement => this._snakesElements[this._snakesElements.indexOf(snakeElement) - 1];

    getSnakeElementForPosition (position: Position): any {
        for (let snakeElement of this._snakesElements) {
            if (snakeElement.position.equals(position)) {
                return snakeElement;
            }
        }
    }

    move (fruit: Fruit): boolean {
        this.lastSnakeElementPosition = this.getLastElement().position;
        this._plane.getPlaneElementForPosition(this.lastSnakeElementPosition).setBlank();
        for (let i = this.snakesElements.length - 1; i >= 0; i--) {
            const snakeElement: SnakesElement = this.snakesElements[i];
            snakeElement.move();
        }

        if(this.head.position.equals(fruit.planeElement.position)) {
            this.addNewSnakeElement(this.lastSnakeElementPosition);
            return true;
        }

        return false;
    }

    toString = (): string => `Snake {length: ${this._snakesElements.length}, head: ${this.head}`;

    private getHead = (): SnakesHead => <SnakesHead>this._snakesElements[0];

    private getLastElement = (): SnakesElement => this._snakesElements[this._snakesElements.length - 1];

    private addNewSnakeElement (lastPosition: Position | null): void {
        const lastElement: SnakesElement = this.getLastElement();
        let newSnakeElement: any = null;

        if(lastPosition) {
            newSnakeElement = new SnakesElement(lastPosition, this);
        } else {
            if (lastElement.direction.value === DirectionValue.Up) newSnakeElement = new SnakesElement(new Position(lastElement.position.x, lastElement.position.y + 1), this);
            if (lastElement.direction.value === DirectionValue.Right) newSnakeElement = new SnakesElement(new Position(lastElement.position.x - 1, lastElement.position.y), this);
            if (lastElement.direction.value === DirectionValue.Down) newSnakeElement = new SnakesElement(new Position(lastElement.position.x, lastElement.position.y - 1), this);
            if (lastElement.direction.value === DirectionValue.Left) newSnakeElement = new SnakesElement(new Position(lastElement.position.x + 1, lastElement.position.y), this);
        }

        this._snakesElements.push(newSnakeElement);
    }
}


