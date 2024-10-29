import { createTranslationMatrix, createRotationMatrixZ, createRotationMatrixY, createRotationMatrixX, multiplyMatrices, multiplyMatrix4_3 } from './matrix'


// Rotation of the items
    // rotation arround himself
        // rotation arround axis Z
export function RotationSelfZ(position, angle) {
    
    const translationToOrigin = createTranslationMatrix(-position.X[0], -position.Y[0], -position.Z[0]);
    const rotationMatrix = createRotationMatrixZ(angle);
    const translationBack = createTranslationMatrix(position.X[0], position.Y[0], position.Z[0]);

    
    return multiplyMatrices(multiplyMatrices(translationBack, rotationMatrix), translationToOrigin);
}

        // rotation arround axis Y
export function RotationSelfY(position, angle) {
    console.log(position, angle)
    const translationToOrigin = createTranslationMatrix(-position.X[0], -position.Y[0], -position.Z[0]);
    const rotationMatrix = createRotationMatrixY(angle);
    const translationBack = createTranslationMatrix(position.X[0], position.Y[0], position.Z[0]);

    
    return multiplyMatrices(multiplyMatrices(translationBack, rotationMatrix), translationToOrigin);
}

        // rotation arround axis X
export function RotationSelfX(position, angle) {
    const translationToOrigin = createTranslationMatrix(-position.X[0], -position.Y[0], -position.Z[0]);
    const rotationMatrix = createRotationMatrixX(angle);
    const translationBack = createTranslationMatrix(position.X[0], position.Y[0], position.Z[0]);

    
    return multiplyMatrices(multiplyMatrices(translationBack, rotationMatrix), translationToOrigin);
}

    // rotation arround Axis (X,Y,Z)
        //rotation axis Z
export function RotationArroundZ(position, angle){
    const rotationMatrix = createRotationMatrixZ(angle);
    return multiplyMatrix4_3(position, rotationMatrix);
}
        //rotation axis Y
export function RotationArroundY(position, angle){
    const rotationMatrix = createRotationMatrixY(angle);
    return multiplyMatrix4_3(position, rotationMatrix);
}
        //rotation axis X
export function RotationArroundX(position, angle){
    const rotationMatrix = createRotationMatrixX(angle);
    return multiplyMatrix4_3(position, rotationMatrix);
}


// Move items

export function Moveitem(position, vector){
    position.X += vector.X;
    position.Y += vector.Y;
    position.Z += vector.Z;
    return position;
}

export function Scaleitem(position, scale){
    const scaleMatrix = [
        [scale.x, 0, 0, 0],
        [0, scale.y, 0, 0],
        [0, 0, scale.z, 0],
        [0, 0, 0, 1]
    ]

    return multiplyMatrix4_3(position, scaleMatrix);
}
        

        


