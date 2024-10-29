

export class Scene {
    static LastID = 0;
    constructor(){
        
        this.sceneID = LastID++;
        this.Items = [];
        this.Cameras = [];
    }


    AddItem(params) {
            items.push(params)
    }


    itemsTo2D(){
        this.Items.forEach((item) => {
            const localRotationMatrix = combineTransformations(item.position, 0.01);
    
            item.triangles.forEach((triangle) => {
                triangle.vertices.forEach((vertex, index) => {
                    const rotatedVertex = multiplyMatrix4_3(localRotationMatrix, vertex);
                    triangle.vertices[index] = new Vector3D(rotatedVertex.x, rotatedVertex.y, rotatedVertex.z);
                });
            });
        });
    
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