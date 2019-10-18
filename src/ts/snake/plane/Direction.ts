import {Position} from "./Position";

export enum DirectionValue {
    Up,
    Right,
    Down,
    Left,
}

export class Direction {
    private readonly _value: DirectionValue;

    constructor(value: DirectionValue) {
        this._value = value;
    }

    get value (): DirectionValue {
        return this._value;
    }

    calculateNewPosition(position: Position): Position {
        if(this._value === DirectionValue.Up) return new Position(position.x, position.y - 1);
        if(this._value === DirectionValue.Right) return new Position(position.x + 1, position.y);
        if(this._value === DirectionValue.Down) return new Position(position.x, position.y + 1);
        return new Position(position.x - 1, position.y);
    }

    static calculateDirection(positionFrom: Position, positionTo: Position): Direction {
        if(positionFrom.x === positionTo.x && positionFrom.y < positionTo.y) return new Direction(DirectionValue.Down);
        if(positionFrom.x === positionTo.x && positionFrom.y > positionTo.y) return new Direction(DirectionValue.Up);
        if(positionFrom.x > positionTo.x && positionFrom.y === positionTo.y) return new Direction(DirectionValue.Left);
        return new Direction(DirectionValue.Right);
    }

}