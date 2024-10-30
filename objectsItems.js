import { Item } from "./itemsController";
import { Vector3D, Triangle } from "./Types";

export class Cube extends Item {
    constructor(position, color, scale, rotation) {
        super(position, color, scale, rotation);
        this.createTriangles(); // Populate triangles specific to a cube
    }

    createTriangles() {
        const s = this.scale / 2;
        const vertices = [
            new Vector3D(this.position.X[0] - s, this.position.Y[0] - s, this.position.Z[0] - s),
            new Vector3D(this.position.X[0] + s, this.position.Y[0] - s, this.position.Z[0] - s),
            new Vector3D(this.position.X[0] + s, this.position.Y[0] + s, this.position.Z[0] - s),
            new Vector3D(this.position.X[0] - s, this.position.Y[0] + s, this.position.Z[0] - s),
            new Vector3D(this.position.X[0] - s, this.position.Y[0] - s, this.position.Z[0] + s),
            new Vector3D(this.position.X[0] + s, this.position.Y[0] - s, this.position.Z[0] + s),
            new Vector3D(this.position.X[0] + s, this.position.Y[0] + s, this.position.Z[0] + s),
            new Vector3D(this.position.X[0] - s, this.position.Y[0] + s, this.position.Z[0] + s)
        ];

        this.triangles = [
            new Triangle(vertices[0], vertices[1], vertices[2], this.color),
            new Triangle(vertices[0], vertices[2], vertices[3], this.color),
            new Triangle(vertices[4], vertices[5], vertices[6], this.color),
            new Triangle(vertices[4], vertices[6], vertices[7], this.color),
            new Triangle(vertices[0], vertices[3], vertices[7], this.color),
            new Triangle(vertices[0], vertices[7], vertices[4], this.color),
            new Triangle(vertices[1], vertices[2], vertices[6], this.color),
            new Triangle(vertices[1], vertices[6], vertices[5], this.color),
            new Triangle(vertices[3], vertices[2], vertices[6], this.color),
            new Triangle(vertices[3], vertices[6], vertices[7], this.color),
            new Triangle(vertices[0], vertices[1], vertices[5], this.color),
            new Triangle(vertices[0], vertices[5], vertices[4], this.color)
        ];
    }
}
