import { createRotationMatrixX, createRotationMatrixY, createRotationMatrixZ, multiplyMatrices } from "./matrix.js"

export class Vector3D {
    constructor(x, y, z) {
        this.X = new Float32Array([x]);
        this.Y = new Float32Array([y]);
        this.Z = new Float32Array([z]);
    }

    toVector4() {
        return [this.X[0], this.Y[0], this.Z[0], 1];
    }
}

export class Colour {
    constructor(r, g, b) {
        this.R = new Uint8Array([r]);
        this.G = new Uint8Array([g]);
        this.B = new Uint8Array([b]);
    }
}

export class Triangle {
    constructor(vertex1, vertex2, vertex3, color) {
        this.vertices = [vertex1, vertex2, vertex3];
        this.color = color;
    }
}


export class Camera {
    constructor(position = new Vector3D(0, 0, 0), rotation = new Vector3D(0, 0, 0)) {
        if (!(position instanceof Vector3D) || !(rotation instanceof Vector3D)) {
            throw new Error("Position and rotation must be of type Vector3D!");
        }
        this.position = position;
        this.rotation = rotation;
    }

    // Returns a combined rotation matrix based on current rotation angles
    getRotationMatrix() {
        const rotationX = createRotationMatrixX(this.rotation.X);
        const rotationY = createRotationMatrixY(this.rotation.Y);
        const rotationZ = createRotationMatrixZ(this.rotation.Z);
        // Combine rotations in order Z -> Y -> X
        return multiplyMatrices(multiplyMatrices(rotationZ, rotationY), rotationX);
    }
}


