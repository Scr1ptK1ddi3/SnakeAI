import {Plane}        from "../plane/Plane";
import {PlaneElement} from "../plane/PlaneElement";
import {Position}     from "../plane/Position";

export class Fruit {
    readonly planeElement: PlaneElement;

    private constructor(position: Position, plane: Plane) {
        this.planeElement = plane.getPlaneElementForPosition(position);
        this.planeElement.setFruit();
    }

    static newInstance = (position: Position, plane: Plane) => new Fruit(position, plane);
}