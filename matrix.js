import { projectionMatrix } from './config'
import { Vector3D } from './Types';

// Helper to create a translation matrix
export function createTranslationMatrix(tx, ty, tz) {
    return [
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ];
}


// Function to multiply two 4x4 matrices
export function multiplyMatrices(matA, matB) {
    const result = Array.from({ length: 4 }, () => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                result[i][j] += matA[i][k] * matB[k][j];
            }
        }
    }
    return result;
}

export function multiplyMatrix4_3(matrix, vector) {
    
    const [x, y, z, w] = vector.toVector4();

    const xPrime = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z + matrix[0][3] * w;
    const yPrime = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z + matrix[1][3] * w;
    const zPrime = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z + matrix[2][3] * w;
    const wPrime = matrix[3][0] * x + matrix[3][1] * y + matrix[3][2] * z + matrix[3][3] * w;

    return wPrime !== 0
        ? { x: xPrime / wPrime, y: yPrime / wPrime, z: zPrime / wPrime }
        : { x: 0, y: 0, z: 0 };
}


// to create a rotation matrix around Z
export function createRotationMatrixZ(angle) {
    return [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

// to create a rotation matrix around Y
export function createRotationMatrixY(angle) {
    return [
        [Math.cos(angle),0 , Math.sin(angle), 0],
        [0, 1, 0, 0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0, 0, 0, 1]
    ];
}

// to create a rotation matrix around X
export function createRotationMatrixX(angle) {
    return [
        [1, 0, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle), 0],
        [0, Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 0, 1]
    ];
}


export function transformAndProject(point, camera) {
    
    // Translate the point based on the camera position (inverse translation)
    const translationMatrix = createTranslationMatrix(-camera.position.X, -camera.position.Y, -camera.position.Z);
    // Rotate based on the camera’s rotation
    const rotationMatrix = camera.getRotationMatrix();
    // Combine translation and rotation
    const cameraTransformMatrix = multiplyMatrices(rotationMatrix, translationMatrix);
    // Apply the combined transformation
    const transformedPoint = multiplyMatrix4_3(cameraTransformMatrix, point);
    // Project to 2D

    return multiplyMatrix4_3(projectionMatrix, new Vector3D(transformedPoint.x, transformedPoint.y, transformedPoint.z));
}


