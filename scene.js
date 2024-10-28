import { projectionMatrix, WINDOW_HIGH, WINDOW_WIDTH } from "./config";
import { Camera, Cube, Colour, multiplyMatrix4_3, Vector3D } from "./Types";

const items = [];
const MainCamera = new Camera();

export const GetItems = () => items;

export const AddItem = (position, color, scale, rotation) => {
    if (!position || !color || !scale || !rotation) {
        throw new Error("Missing arguments in AddItem function!");
    }
    items.push(new Cube(position, color, scale, rotation));
};

const AcubePosition = new Vector3D(0, 0, 3);  
const AcubeColor = new Colour(255, 0, 0);
const AcubeScale = 2;
const AcubeRotation = new Vector3D(0, 0, 0);

AddItem(AcubePosition, AcubeColor, AcubeScale, AcubeRotation);

export const itemsTo2D = () => {
    const Triangles = [];
    items.forEach((item) => {
        item.triangles.forEach((triangle) => {
            const Points = []
            triangle.vertices.forEach((vertex) => {
                
                const point = multiplyMatrix4_3(projectionMatrix, vertex);
                if (point.x >= -1 && point.y >= -1 && point.x <= 1 && point.y <= 1) {
                    const screenX = (point.x + 1) * 0.5 * WINDOW_WIDTH;
                    const screenY = (1 - (point.y + 1) * 0.5) * WINDOW_HIGH;
                    Points.push([screenX, screenY]);
                }

            });
        Triangles.push(Points)
        });
    });

    
    return Triangles;
};
