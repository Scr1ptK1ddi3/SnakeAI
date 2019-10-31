import {GameEngine} from "../GameEngine";
import {Position}   from "./Position";

export enum DirectionValue {
    Up,
    Right,
    Down,
    Left,
}

const DirectionValueToStringMap: Map<DirectionValue, string> = new Map<DirectionValue, string>();
DirectionValueToStringMap.set(DirectionValue.Up, "Up");
DirectionValueToStringMap.set(DirectionValue.Right, "Right");
DirectionValueToStringMap.set(DirectionValue.Down, "Down");
DirectionValueToStringMap.set(DirectionValue.Left, "Left");

export class Direction {
    public static readonly Up: Direction = new Direction(DirectionValue.Up);
    public static readonly Right: Direction = new Direction(DirectionValue.Right);
    public static readonly Down: Direction = new Direction(DirectionValue.Down);
    public static readonly Left: Direction = new Direction(DirectionValue.Left);

    private readonly _value: DirectionValue;

    public static calculateDirection (positionFrom: Position, positionTo: Position): Direction {
        if (positionFrom.x === positionTo.x && positionFrom.y < positionTo.y) return Direction.Down;
        if (positionFrom.x === positionTo.x && positionFrom.y > positionTo.y) return Direction.Up;
        if (positionFrom.x > positionTo.x && positionFrom.y === positionTo.y) return Direction.Left;
        return Direction.Right;
    }

    public static randomDirection = (): Direction => new Direction(GameEngine.randomInt(0, 3));

    private constructor (value: DirectionValue) {
        this._value = value;
    }

    public get value (): DirectionValue {
        return this._value;
    }

    public calculateNewPosition (position: Position): Position {
        if (this._value === DirectionValue.Up) return new Position(position.x, position.y - 1);
        if (this._value === DirectionValue.Right) return new Position(position.x + 1, position.y);
        if (this._value === DirectionValue.Down) return new Position(position.x, position.y + 1);
        return new Position(position.x - 1, position.y);
    }

    getString = (): string => <string> DirectionValueToStringMap.get(this._value);
    toString = (): string => `Direction {value: ${DirectionValueToStringMap.get(this._value)}}`;

}


