import { WINDOW_HIGH, WINDOW_WEIDTH, FOV } from "./config";
import { Camera, Cube, Vector3D } from "./Types";

const items = [];


const MainCamera = new Camera();
const Acube = new Cube(new Vector3D(0,0,10));

export const GetItems = () => {
    return items;
}

export const Additem = (position, color, scale, rotation) => {
    if (!position || !color || !scale || !rotation) {
        throw new Error("Missing arguments in Additem function!");
    }

    items.push(new Cube(position, color, scale, rotation));
}


Additem(Acube);

export const itemsInCamera = ()=>{
    items.map((item) =>{
        const distance = new Vector3D(Math.abs(MainCamera.position.X - item.position.X),
        Math.abs(MainCamera.position.Y - item.position.Y), Math.abs(MainCamera.position.Z - item.position.Z))

        
    })

}

