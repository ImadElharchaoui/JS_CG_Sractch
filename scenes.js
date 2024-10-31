import { multiplyMatrix4_3 } from './matrix'
import { projectionMatrix, WINDOW_HIGH, WINDOW_WIDTH } from './config';

export class Scene {
    static LastID = 0;
    constructor(){
        
        this.sceneID = this.LastID++;
        this.Items = [];
        this.Cameras = [];
    }


    AddItem(params) {
            this.Items.push(params)
    }


    itemsTo2D(){
    
        const Triangles = [];
        this.Items.forEach((item) => {
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
}