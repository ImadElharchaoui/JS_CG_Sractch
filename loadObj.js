import { Item } from "./itemsController"; 
import { Vector3D } from "./Types";

export class OBJLoader {
    static async load(url, pos) {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error fetching OBJ model: ${response.statusText}`);
            return null;
        }
        const text = await response.text();
        return this.parseOBJ(text, pos);
    }

    static parseOBJ(data, pos) {
        const vertices = [];
        const faces = [];
        const lines = data.split("\n");

        for (let line of lines) {
            line = line.trim();
            if (line.startsWith("v ")) {
                const parts = line.split(" ").slice(1).map(parseFloat);
                if (parts.length >= 3) {
                    vertices.push(new Vector3D(parts[0], parts[1], parts[2]));
                } else {
                    console.warn(`Invalid vertex line: ${line}`);
                }
            } else if (line.startsWith("f ")) {
                const parts = line.split(" ").slice(1);
                const faceVertices = parts.map(part => {
                    const vertexIndex = parseInt(part.split("/")[0]);
                    if (isNaN(vertexIndex)) {
                        console.warn(`Invalid vertex index (NaN): ${part} in line: ${line}`);
                        return null;
                    }
                    if (vertexIndex <= 0 || vertexIndex > vertices.length) {
                        console.warn(`Invalid face vertex index: ${vertexIndex} in line: ${line}`);
                        return null;
                    }
                    return vertices[vertexIndex - 1]; // Convert from 1-based to 0-based
                }).filter(vertex => vertex !== null);

                if (faceVertices.length > 0) {
                    faces.push(faceVertices);
                } else {
                    console.warn(`Face with no valid vertices found in line: ${line}`);
                }
            }
        }

        // Create an Item instance with triangles
        console.log("pos",pos)
        const item = new Item(pos);
        console.log("face:", faces[0][0])
        item.triangles = faces.map(face => ({
            vertices: face.map(vertex => new Vector3D(vertex.X, vertex.Y, vertex.Z)) // Ensure vertices are Vector3D instances
        }));

        return item;
    }
}
