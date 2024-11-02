import { transformAndProject } from './matrix';
import { WINDOW_HIGH, WINDOW_WIDTH } from './config';
import { Camera, Vector3D } from './Types';

export class Scene {
    static LastID = 0;
    constructor() {
        this.sceneID = Scene.LastID++;
        this.Items = [];
        this.Cameras = [new Camera(new Vector3D(0, 0, -10))];
    }

    AddItem(params) {
        this.Items.push(params);
    }

    itemsTo2D() {
        const camera = this.Cameras[0];  // Use the first camera for projection
        const Triangles = [];
        

        this.Items.forEach((item) => {
            item.triangles.forEach((triangle) => {
                const Points = [];
                triangle.vertices.forEach((vertex) => {
                    
                    // Use transformAndProject to apply camera transformation and projection
                    const point = transformAndProject(vertex, camera);
                    
                    // Check if the projected point is within the screen bounds
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
    }
}
