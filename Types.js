
export class Vector3D {
    constructor(x, y, z) {
        this.X = new Uint32Array([x]);
        this.Y = new Uint32Array([y]);
        this.Z = new Uint32Array([z]);
    }
}


export class Colour {
    constructor(r, g, b) {
        this.R = new Uint8Array([r]);
        this.G = new Uint8Array([g]);
        this.B = new Uint8Array([b]);
    }
}


export class Cube {
    constructor(position = new Vector3D(0 ,0 ,0), color = new Colour(255,0,0), scale = 1 , rotation = new Vector3D(0 ,0 ,0)) {
        if (!(position instanceof Vector3D) || !(rotation instanceof Vector3D) || !(color instanceof Colour)) {
            throw new Error("Position and rotation must be of type Vector3D and color of type Colour.");
        }
        this.position = position;
        this.rotation = rotation;
        this.color = color;
        this.scale = new Uint8Array([scale]);
    }
}

export class Camera {
    constructor(position = new Vector3D(0 ,0 ,0), rotation = new Vector3D(0 ,0 ,0)){
        if(!(position instanceof Vector3D) || !(rotation instanceof Vector3D)){
            throw new Error("position and rotation must be of type Vector3D !")
        }
        this.position = position;
        this.rotation = rotation;
    }
}