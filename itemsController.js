import { RotationSelfX, RotationSelfY, RotationSelfZ } from "./itemsManger";
import { Vector3D, Triangle, Colour } from "./Types";
import { multiplyMatrix4_3 } from "./matrix";

export class Item {
    constructor(position = new Vector3D(0, 0, 0), color = new Colour(255, 255, 255), scale = 1, rotation = new Vector3D(0, 0, 0)) {
        if (!(position instanceof Vector3D) || !(rotation instanceof Vector3D) || !(color instanceof Colour)) {
            throw new Error("Position, rotation must be of type Vector3D and color must be of type Colour.");
        }
        
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.color = color;
        this.triangles = [];
    }

    
    #applyTransformation(matrixFunc) {
        this.triangles.forEach((triangle) => {
            
            const localMatrix = matrixFunc(this.position, 0.01)
            triangle.vertices.forEach((vertex, index) => {
                const transformedVertex = multiplyMatrix4_3(localMatrix, vertex);
                triangle.vertices[index] = new Vector3D(transformedVertex.x, transformedVertex.y, transformedVertex.z);
            });
        });
    }
    
    
    createTriangles() {
        throw new Error("createTriangles() method must be implemented in subclass.");
    }

    RotateSelfY(){
        this.#applyTransformation(RotationSelfY)
    }

    RotateSelfX(){
        this.#applyTransformation(RotationSelfX)
    }
    RotateSelfZ(){
        this.#applyTransformation(RotationSelfZ)
    }

    #transferItem(vector) {
        this.triangles.forEach((triangle) => {
            const Vitess = 0.01;
            triangle.vertices.forEach((vertex, index) => {
                const transformedVertex = new Vector3D(
                    vertex.X[0] + vector.X[0] * Vitess,
                    vertex.Y[0] + vector.Y[0] * Vitess,
                    vertex.Z[0] + vector.Z[0] * Vitess
                );
                triangle.vertices[index] = new Vector3D(transformedVertex.X[0], transformedVertex.Y[0], transformedVertex.Z[0]);
            });
        });
    }
    

    applyTransfer(vector){
        this.#transferItem(vector);
    }
}
