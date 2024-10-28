import { MatrixTransZ, projectionMatrix, WINDOW_HIGH, WINDOW_WIDTH } from "./config";
import { Camera, Cube, Colour, multiplyMatrix4_3, Vector3D } from "./Types";
import { combineTransformations } from './matrix'

const items = [];
const MainCamera = new Camera();

export const GetItems = () => items;

export const AddItem = (position, color, scale, rotation) => {
    if (!position || !color || !scale || !rotation) {
        throw new Error("Missing arguments in AddItem function!");
    }
    items.push(new Cube(position, color, scale, rotation));
};

const AcubePosition = new Vector3D(0, 0, 5);
const AcubeColor = new Colour(255, 0, 0);
const AcubeScale = 2;
const AcubeRotation = new Vector3D(0, 0, 0);

AddItem(AcubePosition, AcubeColor, AcubeScale, AcubeRotation);

export const itemsTo2D = () => {
    items.forEach((item) => {
        const localRotationMatrix = combineTransformations(item.position, 0.01);

        item.triangles.forEach((triangle) => {
            triangle.vertices.forEach((vertex, index) => {
                const rotatedVertex = multiplyMatrix4_3(localRotationMatrix, vertex);
                triangle.vertices[index] = new Vector3D(rotatedVertex.x, rotatedVertex.y, rotatedVertex.z);
            });
        });
    });

    const Triangles = [];
    items.forEach((item) => {
        item.triangles.forEach((triangle) => {
            const Points = [];

            triangle.vertices.forEach((vertex) => {
                const point = multiplyMatrix4_3(projectionMatrix, vertex);
                
                if (point.x >= -1 && point.y >= -1 && point.x <= 1 && point.y <= 1) {
                    const screenX = (point.x + 1) * 0.5 * WINDOW_WIDTH;
                    const screenY = (1 - (point.y + 1) * 0.5) * WINDOW_HIGH;
                    Points.push([screenX, screenY]);
                }
            });

            if (Points.length === 3) {
                Triangles.push(Points);
            }
        });
    });

    return Triangles;
};

