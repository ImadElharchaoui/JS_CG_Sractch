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

export class Cube {
    constructor(position, color, scale, rotation) {
        if (!(position instanceof Vector3D) || !(rotation instanceof Vector3D) || !(color instanceof Colour)) {
            throw new Error("Position and rotation must be of type Vector3D and color of type Colour.");
        }
        this.position = position;
        this.rotation = rotation;
        this.color = color;
        this.scale = scale;
        this.triangles = this.createTriangles();
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

        return [
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

export class Camera {
    constructor(position = new Vector3D(0, 0, 0), rotation = new Vector3D(0, 0, 0)) {
        if (!(position instanceof Vector3D) || !(rotation instanceof Vector3D)) {
            throw new Error("Position and rotation must be of type Vector3D!");
        }
        this.position = position;
        this.rotation = rotation;
    }
}

