
import { WINDOW_HIGH, WINDOW_WIDTH } from "./config";
import Thescene from "./TestScene";
import { RotationSelfX, RotationSelfY, RotationSelfZ } from './itemsManger';
import { Vector3D } from "./Types";
import { multiplyMatrix4_3 } from './matrix'

const canvas = document.querySelector(".canvas");
const FPS_display = document.querySelector(".FPS_display");

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HIGH;

const ctx = canvas.getContext("2d");

function drawTriangle([x1, y1], [x2, y2], [x3, y3], color = "#FF0000") {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    ctx.stroke();
}

let lastFrameTime = 0;
let frameCount = 0;
let fps = 0;

function update() {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastFrameTime;

    frameCount++;
    if (deltaTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = currentTime;
        FPS_display.textContent = `FPS: ${fps}`;
    }

    
    //Thescene.Items[0].RotateSelfZ();
    //Thescene.Items[0].applyTransfer(new Vector3D(0, 0, 1))
    
    const Triangles = Thescene.itemsTo2D();

    

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    if (Triangles.length > 0) {
        Triangles.forEach(([[x1, y1], [x2, y2], [x3, y3]]) => {
            drawTriangle([x1, y1], [x2, y2], [x3, y3]);
        });
    } else {
       //for debgun if no Triangle
       //console.log("no triangle")
    }

    requestAnimationFrame(update);
}

update();
