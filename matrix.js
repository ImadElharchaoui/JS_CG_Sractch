// Helper to create a translation matrix
function createTranslationMatrix(tx, ty, tz) {
    return [
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ];
}

// Helper to create a rotation matrix around Z
function createRotationMatrixZ(angle) {
    return [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

// Function to multiply two 4x4 matrices
function multiplyMatrices(matA, matB) {
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

// Combine transformations to rotate around the cube's local Z-axis
export function combineTransformations(position, angle) {
    const translationToOrigin = createTranslationMatrix(-position.X[0], -position.Y[0], -position.Z[0]);
    const rotationMatrix = createRotationMatrixZ(angle);
    const translationBack = createTranslationMatrix(position.X[0], position.Y[0], position.Z[0]);

    // Combine all transformations into a single matrix
    return multiplyMatrices(multiplyMatrices(translationBack, rotationMatrix), translationToOrigin);
}
