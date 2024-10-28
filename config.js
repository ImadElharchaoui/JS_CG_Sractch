
export const WINDOW_HIGH = 480;
export const WINDOW_WIDTH = 960;
export const FOV = 90;
const aspect = WINDOW_HIGH / WINDOW_WIDTH;
const Z_near = 0.1;
const Z_far = 1000;

const tanAlpha = 1 / Math.tan((FOV * 0.5 * Math.PI) / 180);

export const projectionMatrix = [
    [ 1/ (aspect * tanAlpha) , 0, 0, 0],
    [0, 1 / tanAlpha, 0, 0],
    [0, 0, (-Z_far * Z_near) / (Z_far - Z_near), (-2 *Z_far * Z_near) / (Z_far - Z_near)],
    [0, 0, 1, 0]
];