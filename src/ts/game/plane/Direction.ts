import {Position} from "./Position";

export enum DirectionValue {
    Up,
    Right,
    Down,
    Left,
}

const DirectionValueToStringMap: Map<DirectionValue, String> = new Map<DirectionValue, String>();
DirectionValueToStringMap.set(DirectionValue.Up, "Up");
DirectionValueToStringMap.set(DirectionValue.Right, "Right");
DirectionValueToStringMap.set(DirectionValue.Down, "Down");
DirectionValueToStringMap.set(DirectionValue.Left, "Left");

export class Direction {
    private readonly _value: DirectionValue;

    static calculateDirection (positionFrom: Position, positionTo: Position): Direction {
        if (positionFrom.x === positionTo.x && positionFrom.y < positionTo.y) return new Direction(DirectionValue.Down);
        if (positionFrom.x === positionTo.x && positionFrom.y > positionTo.y) return new Direction(DirectionValue.Up);
        if (positionFrom.x > positionTo.x && positionFrom.y === positionTo.y) return new Direction(DirectionValue.Left);
        return new Direction(DirectionValue.Right);
    }

    constructor (value: DirectionValue) {
        this._value = value;
    }

    get value (): DirectionValue {
        return this._value;
    }

    calculateNewPosition (position: Position): Position {
        if (this._value === DirectionValue.Up) return new Position(position.x, position.y - 1);
        if (this._value === DirectionValue.Right) return new Position(position.x + 1, position.y);
        if (this._value === DirectionValue.Down) return new Position(position.x, position.y + 1);
        return new Position(position.x - 1, position.y);
    }

    toString = (): String => `Direction {value: ${DirectionValueToStringMap.get(this._value)}}`;

}


