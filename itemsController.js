import { RotationSelfX, RotationSelfY, RotationSelfZ, Moveitem } from "./itemsManger";
import { Vector3D, Colour } from "./Types";
import { multiplyMatrix4_3 } from "./matrix";


export class Item {
    constructor(position = new Vector3D(0, 0, 0), color = new Colour(255, 255, 255), scale = 1, rotation = new Vector3D(0, 0, 0)) {
        if (!(position instanceof Vector3D) || !(rotation instanceof Vector3D) || !(color instanceof Colour)) {
            throw new Error("Position, rotation must be of type Vector3D and color must be of type Colour.");
        }
        
        this.position = position;  // Item center position
        this.rotation = rotation;  // Rotation angles around x, y, and z
        this.scale = scale;
        this.color = color;
        this.triangles = [];
    }

    // Helper method to apply transformations to vertices around item center
    #applySelfRotation(matrixFunc) {
        const rotationMatrix = matrixFunc(this.position, 0.01);
        this.triangles.forEach((triangle) => {
            triangle.vertices.forEach((vertex, index) => {
                const transformedVertex = multiplyMatrix4_3(rotationMatrix, vertex);
                triangle.vertices[index] = new Vector3D(transformedVertex.x, transformedVertex.y, transformedVertex.z);
            });
        });
    }

    // Self-rotation methods
    RotateSelfY() {
        this.#applySelfRotation(RotationSelfY);
    }

    RotateSelfX() {
        this.#applySelfRotation(RotationSelfX);
    }

    RotateSelfZ() {
        this.#applySelfRotation(RotationSelfZ);
    }

    // Method to move item position and translate all vertices
    #transferItem(vector) {
        const Vitess = 0.01;
        this.triangles.forEach((triangle) => {
            
            triangle.vertices.forEach((vertex, index) => {
                const transformedVertex = new Vector3D(
                    vertex.X[0] + vector.X[0] * Vitess,
                    vertex.Y[0] + vector.Y[0] * Vitess,
                    vertex.Z[0] + vector.Z[0] * Vitess
                );
                this.position = new Vector3D(
                    this.position.X = Number(this.position.X) + Number(vector.X) * Vitess,
                    this.position.Y = Number(this.position.Y) + Number(vector.Y) * Vitess,
                    this.position.Z = Number(this.position.Z) + Number(vector.Z) * Vitess
                )
                triangle.vertices[index] = new Vector3D(transformedVertex.X[0], transformedVertex.Y[0], transformedVertex.Z[0]);
            });
        });
    }

    applyTransfer(vector){
        this.#transferItem(vector);
    }



    createTriangles() {
        throw new Error("createTriangles() method must be implemented in subclass.");
    }
}
